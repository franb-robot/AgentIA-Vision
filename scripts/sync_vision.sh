#!/bin/bash
# Se ejecuta haciendo: ./sync_vision.sh

# 1. Limpieza de Trazabilidad: Elimina archivos invisibles que ensucian la ventana de contexto
find . -name ".DS_Store" -delete

# 2. Preparación de Entorno: Asegurar carpetas críticas de la Fase 0 (Data Acquisition)
mkdir -p data/dataset_raw/{circle,square,rectangle,triangle,unknown}
mkdir -p scripts

# 3. Registro de cambios integral: Incluye manuales, herramientas y estructura
# 'git add .' ya incluye recursivamente las carpetas data/ y scripts/
git add .

# 4. Commit estructurado: Refleja la actualización técnica a ESP32-S3 y Modbus TCP
git commit -m "Refactor: Update architecture to ESP32-S3-EYE, Modbus TCP, and Phase 0 structure"

# 5. Sincronización Remota: Sube los cambios definitivamente a GitHub
git push origin main

echo "GitHub actualizado. El contexto del Agente ahora está sincronizado local y remotamente."
