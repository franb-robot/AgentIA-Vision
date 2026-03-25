import * as net from 'net';
import * as Modbus from 'jsmodbus';

const MODBUS_PORT = parseInt(process.env.MODBUS_PORT ?? '5020', 10);
const COIL_COUNT = 8; // I0.0 a I0.7

const server = new net.Server();

const modbusServer = new Modbus.server.TCP(server, {
  coils: Buffer.alloc(Math.ceil(COIL_COUNT / 8), 0),
});

server.listen(MODBUS_PORT, '0.0.0.0', () => {
  console.log(`[PLC Simulator] Modbus TCP escuchando en puerto ${MODBUS_PORT}`);
  console.log(`[PLC Simulator] Simula Siemens S7-1200 — 8 coils (I0.0-I0.7)`);
  console.log(`[PLC Simulator] Mapeo: Square=0 | Rectangle=1 | Circle=2 | Triangle=3`);
});

modbusServer.on('connection', () => {
  console.log(`[PLC Simulator] Cliente conectado`);
});

server.on('error', (err: Error) => {
  console.error('[PLC Simulator] Error:', err.message);
});

process.on('SIGINT', () => {
  console.log('\n[PLC Simulator] Apagando...');
  server.close(() => process.exit(0));
});
