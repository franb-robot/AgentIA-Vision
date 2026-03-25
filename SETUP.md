# Setup — AgentIA Vision

Guía paso a paso para poner en marcha el proyecto desde cero en cualquier máquina.

## Requisitos previos

- Node.js v20 o superior (`node --version`)
- npm v10 o superior (`npm --version`)
- Git

## 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd desarrollo-agentia-vision-pictures
```

## 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

Si aparece `Permission denied` al ejecutar scripts de npm:

```bash
chmod -R u+x node_modules/.bin
```

## 3. Configurar variables de entorno

```bash
cp .env.example .env
```

El `.env` por defecto ya funciona para desarrollo local:

```
MODBUS_HOST=127.0.0.1
MODBUS_PORT=5020
PULSE_DURATION_MS=500
CORS_ORIGIN=http://localhost:4200
PORT=3000
```

## 4. Arrancar el simulador de PLC (Terminal A)

Simula un Siemens S7-1200 vía Modbus TCP en el puerto 5020.

```bash
cd backend
npm run start:simulator
```

Salida esperada:
```
[PLC Simulator] Modbus TCP escuchando en puerto 5020
[PLC Simulator] Simula Siemens S7-1200 — 8 coils (I0.0-I0.7)
```

**Dejar corriendo.**

## 5. Arrancar el backend NestJS (Terminal B)

```bash
cd backend
npm run start:dev
```

Salida esperada:
```
[PlcService] Conectado a Modbus TCP en 127.0.0.1:5020
[NestApplication] Nest application successfully started
[Backend] Corriendo en puerto 3000
```

**Dejar corriendo.**

## 6. Verificar endpoints (Terminal C)

### Disparar coil (Shape → PLC)

```bash
curl -X POST http://localhost:3000/plc/trigger \
  -H "Content-Type: application/json" \
  -d '{"coil_index": 0, "pulse_duration_ms": 500}'
# Respuesta: {"ok":true}
```

### Leer estado de un coil

```bash
curl http://localhost:3000/plc/coils/0
# Respuesta: {"coil_index":0,"state":false}
```

### Escuchar eventos en tiempo real (SSE)

```bash
curl -N http://localhost:3000/plc/events
# Al disparar un trigger aparecen eventos en tiempo real
```

## Mapeo shapes → coils

| Shape      | coil_index | Dirección PLC |
|------------|-----------|---------------|
| Square     | 0         | I0.0          |
| Rectangle  | 1         | I0.1          |
| Circle     | 2         | I0.2          |
| Triangle   | 3         | I0.3          |
| Reservado  | 4–7       | I0.4–I0.7     |

## Notas sobre tsconfig

El archivo `tsconfig.json` incluye `"types": ["node"]` para evitar errores de tipos
con librerías de Express que no tienen `@types` instalados.

## Fases del proyecto

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1 — Backend + PLC simulado | ✅ Completo | NestJS + jsmodbus + modbus-serial |
| 2 — Frontend Angular       | ⬜ Pendiente | Dashboard SSE + botones por shape |
| 3 — Visión simulada        | ⬜ Pendiente | Endpoint /vision/detect con dataset |
| 4 — ESP32-S3-EYE           | ⬜ Pendiente | Reemplaza visión simulada |
