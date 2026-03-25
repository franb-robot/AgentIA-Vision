import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import ModbusRTU from 'modbus-serial';

export interface CoilEvent {
  coil_index: number;
  state: boolean;
  timestamp: number;
}

@Injectable()
export class PlcService implements OnModuleInit, OnModuleDestroy {
  private client: ModbusRTU;
  private connected = false;

  constructor(
    private readonly config: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.client = new ModbusRTU();
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connected) {
      this.client.close(() => {});
    }
  }

  private async connect(): Promise<void> {
    const host = this.config.get<string>('MODBUS_HOST', '127.0.0.1');
    const port = this.config.get<number>('MODBUS_PORT', 5020);
    try {
      await this.client.connectTCP(host, { port });
      this.client.setID(1);
      this.connected = true;
      console.log(`[PlcService] Conectado a Modbus TCP en ${host}:${port}`);
    } catch (err: any) {
      console.warn(`[PlcService] Conexión fallida, reintentando en 3s... (${err.message})`);
      this.connected = false;
      setTimeout(() => this.connect(), 3000);
    }
  }

  async triggerCoil(coilIndex: number, pulseDurationMs?: number): Promise<void> {
    const duration = pulseDurationMs ?? this.config.get<number>('PULSE_DURATION_MS', 500);

    if (!this.connected) {
      throw new Error('Modbus no conectado — ¿está corriendo el simulador?');
    }

    await this.client.writeCoil(coilIndex, true);
    this.emitCoilEvent(coilIndex, true);

    await new Promise(resolve => setTimeout(resolve, duration));

    await this.client.writeCoil(coilIndex, false);
    this.emitCoilEvent(coilIndex, false);
  }

  async readCoil(coilIndex: number): Promise<boolean> {
    if (!this.connected) {
      throw new Error('Modbus no conectado — ¿está corriendo el simulador?');
    }
    const result = await this.client.readCoils(coilIndex, 1);
    return result.data[0];
  }

  private emitCoilEvent(coilIndex: number, state: boolean): void {
    const event: CoilEvent = {
      coil_index: coilIndex,
      state,
      timestamp: Date.now(),
    };
    this.eventEmitter.emit('plc.coil.changed', event);
  }
}
