import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Sse,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TriggerPlcDto } from './dto/trigger-plc.dto';
import { CoilEvent, PlcService } from './plc.service';

@Controller('plc')
export class PlcController {
  private readonly sseSubject = new Subject<CoilEvent>();

  constructor(private readonly plcService: PlcService) {}

  @Post('trigger')
  @HttpCode(HttpStatus.OK)
  async trigger(@Body() dto: TriggerPlcDto): Promise<{ ok: boolean }> {
    await this.plcService.triggerCoil(dto.coil_index, dto.pulse_duration_ms);
    return { ok: true };
  }

  @Get('coils/:index')
  async getCoil(
    @Param('index', ParseIntPipe) index: number,
  ): Promise<{ coil_index: number; state: boolean }> {
    const state = await this.plcService.readCoil(index);
    return { coil_index: index, state };
  }

  @Sse('events')
  events(): Observable<{ data: CoilEvent; type: string }> {
    return this.sseSubject.asObservable().pipe(
      map((event: CoilEvent) => ({ data: event, type: 'coil.changed' })),
    );
  }

  @OnEvent('plc.coil.changed')
  handleCoilEvent(event: CoilEvent): void {
    this.sseSubject.next(event);
  }
}
