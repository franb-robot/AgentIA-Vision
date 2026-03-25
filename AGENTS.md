# AGENTS.md — AgentIA Vision

Documento de arquitectura para agentes y colaboradores.
Actualizado: 2026-03-25

---

## Descripción del proyecto

Sistema de visión industrial que detecta la forma de piezas en una célula robotizada
y activa el actuador correspondiente en un PLC Siemens S7-1200 vía Modbus TCP.

Objetivo final: ESP32-S3-EYE captura imagen → modelo de visión detecta shape →
backend NestJS envía pulso al PLC → robot clasifica la pieza.

---

## Arquitectura actual

```
[ESP32-S3-EYE]          [Backend NestJS :3000]      [Frontend Angular :4200]
  (pendiente)    HTTP→   PlcController               Dashboard
                         POST /plc/trigger    SSE→   Estado coils en tiempo real
                         GET  /plc/coils/:i          Botones manuales por shape
                         GET  /plc/events
                              ↓
                         PlcService
                         modbus-serial (cliente TCP)
                              ↓
                    [Simulador / PLC Real :5020]
                    jsmodbus (dev)
                    Siemens S7-1200 (producción)
```

---

## Stack tecnológico

| Capa        | Tecnología              | Estado     |
|-------------|-------------------------|------------|
| Backend     | NestJS 10 + TypeScript  | ✅ Operativo|
| PLC sim     | jsmodbus 4.0.10         | ✅ Operativo|
| PLC cliente | modbus-serial 8.x       | ✅ Operativo|
| Eventos     | @nestjs/event-emitter   | ✅ Operativo|
| Config      | @nestjs/config (.env)   | ✅ Operativo|
| Frontend    | Angular (por definir)   | ⬜ Pendiente|
| Visión      | ESP32-S3-EYE            | ⬜ Sin hardware|

---

## Endpoints del backend

| Método | Ruta               | Descripción                              |
|--------|--------------------|------------------------------------------|
| POST   | /plc/trigger       | Envía pulso ON→OFF a un coil             |
| GET    | /plc/coils/:index  | Lee el estado actual de un coil (0–7)    |
| GET    | /plc/events        | Stream SSE de cambios de estado de coils |

### Body de POST /plc/trigger

```json
{
  "coil_index": 0,
  "pulse_duration_ms": 500
}
```

- `coil_index`: entero 0–7 (obligatorio)
- `pulse_duration_ms`: entero 50–10000 ms (opcional, por defecto usa `PULSE_DURATION_MS` del .env)

---

## Mapeo shapes → coils PLC

| Shape      | coil_index | Dirección PLC |
|------------|-----------|---------------|
| Square     | 0         | I0.0          |
| Rectangle  | 1         | I0.1          |
| Circle     | 2         | I0.2          |
| Triangle   | 3         | I0.3          |
| Reservado  | 4–7       | I0.4–I0.7     |

---

## Estructura de ficheros relevante

```
backend/
  src/
    main.ts                        # Bootstrap NestJS
    app.module.ts                  # ConfigModule + EventEmitterModule + PlcModule
    plc/
      plc.module.ts                # Módulo NestJS
      plc.controller.ts            # REST + SSE
      plc.service.ts               # Cliente Modbus TCP, lógica de pulso
      plc-simulator.ts             # Servidor Modbus TCP (solo desarrollo)
      dto/
        trigger-plc.dto.ts         # Validación de entrada
  .env                             # Variables de entorno (no commitear)
  .env.example                     # Plantilla de variables
  package.json
  tsconfig.json
AGENTS.md                          # Este archivo
SETUP.md                           # Guía de instalación desde cero
```

---

## Fases del proyecto

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1 — Backend + PLC simulado | ✅ Completo  | NestJS + Modbus TCP simulado |
| 2 — Frontend Angular       | ⬜ Pendiente | Dashboard SSE + botones     |
| 3 — Visión simulada        | ⬜ Pendiente | /vision/detect con dataset  |
| 4 — ESP32-S3-EYE           | ⬜ Pendiente | Hardware real de cámara     |
