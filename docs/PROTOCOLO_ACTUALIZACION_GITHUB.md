CADA VEZ QUE HAGAMOS CUALQUIER COSA EN EL PROYECTO, HAY QUE
ACTUALIZAR EN EL GITHUB CON ESTE FORMATO:
Dónde guardar la documentación
La carpeta correcta es /docs, que ya está referenciada en el README.md del proyecto
como "Documentación técnica y registros de aprendizaje"
. Dentro de ella, propongo esta
estructura:
/docs
/hardware
/captura-rapida-imagenes
README.md ← documento principal del avance
esquema-circuito.png
fotos-prototipo/
pruebas-rendimiento.md
/software
/integracion
Así cuando haya más avances de hardware (ESP32, PLC, Kuka...) cada uno tiene su
carpeta propia y todo está organizado.
Con qué formato
Markdown (.md) es el formato estándar en GitHub por tres razones prácticas: se visualiza
directamente en el navegador sin necesitar ningún programa, Git puede comparar los
cambios línea a línea, y cualquier editor (VS Code, Cursor, incluso el Bloc de notas) puede
escribirlo.
La estructura del documento principal debería ser:
# Dispositivo de Captura Rápida de Imágenes
## Descripción
Qué es y para qué sirve en el contexto de AgentIA-Vision.
## Hardware utilizado
- Componente 1: modelo, referencia, enlace de compra
- Componente 2: ...
## Esquema de conexiones
![Esquema](esquema-circuito.png)
## Resultados obtenidos
- FPS conseguidos: X
- Comparativa con ESP32-EYE estándar: ...
## Cómo reproducirlo
Pasos para que otro colaborador monte el mismo dispositivo.
## Próximos pasos
Qué queda por hacer o mejorar.
Cómo lo sube jeronimo-beep con GitHub Desktop
El proceso exacto que debe seguir:
1. Abrir GitHub Desktop → Fetch origin para asegurarse de estar al día.
2. Crear una rama nueva:
Current Branch → New Branch → feature/doc-captura-rapida-imagenes
3. Abrir el explorador de Windows y navegar a:
C:\Proyectos\AgentIA-Vision\docs\hardware\captura-rapida-imagenes\
Crear esa carpeta si no existe y añadir dentro el README.md y cualquier imagen o archivo
adicional.
4. En GitHub Desktop verá los archivos nuevos en el panel izquierdo. Escribe en Summary:
docs: añadir documentación dispositivo captura rápida de imágenes
Y clic en Commit to feature/doc-captura-rapida-imagenes.
5. Clic en Push origin.
6. Clic en Create Pull Request → se abre GitHub en el navegador.
7. Rellena el PR:
●
●
●
●
●
Base: develop
Compare: feature/doc-captura-rapida-imagenes
Título: docs: dispositivo de captura rápida de imágenes
Descripción: resumen de qué ha desarrollado y qué archivos añade
Reviewer: franb-robot (tú)
Lo que ve el administrador
Recibirás un email de GitHub avisando del PR. Entras, revisas la documentación, y si está
bien haces el merge a develop. A partir de ese momento todos los colaboradores ven el
avance con un simple:
git pull origin develop
PLANTILLA PARA RELLENAR EL Readme.md
📷 [TÍTULO: Describe brevemente el
dispositivo, ej: "Módulo de Captura
Rápida de Imágenes con ESP32-CAM"]
Instrucciones para rellenar esta plantilla:
●
●
●
●
Sustituye todo el texto entre corchetes [ ] por tu información real.
Borra las líneas que empiezan por > cuando hayas terminado (son
instrucciones).
Si alguna sección no aplica todavía, escribe En desarrollo en lugar
de borrarla.
Las imágenes y fotos van en la misma carpeta que este archivo.
Nómbralas en minúsculas y sin espacios (ej:
esquema-conexiones.png).
1. Descripción general
[Explica en 2-3 frases qué hace este dispositivo y qué problema resuelve dentro del
proyecto AgentIA-Vision. Por ejemplo: "Este módulo permite capturar imágenes a mayor
velocidad que la configuración estándar con ESP32-EYE, reduciendo la latencia entre
captura y envío al modelo de visión.
"]
2. Contexto dentro de AgentIA-Vision
[Explica en qué parte del flujo del proyecto encaja este dispositivo.]
Captura (este dispositivo) → Procesamiento (Claude 4.6) → Acción (PLC / Kuka)
[Describe brevemente cómo se conecta con el resto del sistema.]
3. Hardware utilizado
Componente Modelo /
Referencia
[Componente 1] [Modelo exacto] [Para qué
sirve]
[Componente 2] [Modelo exacto] [Para qué
sirve]
[Componente 3] [Modelo exacto] [Para qué
sirve]
Función Enlace o
referencia
[URL o referencia]
[URL o referencia]
[URL o referencia]
4. Esquema de conexiones
Añade aquí una foto o esquema del circuito. Guarda la imagen en esta misma
carpeta y reemplaza esquema-conexiones.png por el nombre real de tu
archivo.
Mostrar imagen
[Descripción breve del esquema: qué pines se usan, voltajes, consideraciones importantes.]
5. Fotos del prototipo
Añade aquí fotos reales del dispositivo montado. Puedes poner varias.
Mostrar imagen
[Descripción de lo que se ve en la foto.]
6. Resultados obtenidos
[Rellena con los datos reales que hayas medido.]
Métrica Valor obtenido Comparativa con
referencia
FPS (fotogramas por
segundo)
[X fps] [ESP32-EYE estándar: Y fps]
Resolución máxima [X x Y px] [Referencia: X x Y px]
Latencia captura → envío [X ms] [Referencia: Y ms]
Consumo energético [X mA / X W] [Referencia: Y mA]
[Añade cualquier observación relevante sobre los resultados.]
7. Cómo reproducir este dispositivo
Esta sección permite que cualquier colaborador pueda montar el mismo
dispositivo desde cero.
7.1 Material necesario
[Lista todo lo que se necesita comprar o tener disponible.]
7.2 Montaje paso a paso
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]
7.3 Configuración de software
[Si hay código, librerías o configuraciones necesarias, descríbelas aquí. Si el código está en
la carpeta /scripts o /backend del proyecto, indica la ruta exacta.]
bash
# Ejemplo de comandos si los hay
[comando 1]
[comando 2]
8. Problemas conocidos y limitaciones
[Describe honestamente qué no funciona todavía o qué limitaciones tiene el dispositivo
actual.]
●
●
[Limitación 1]
[Limitación 2]
9. Próximos pasos
[Qué queda por hacer o mejorar en este dispositivo.]
●
●
●
[Tarea pendiente 1]
[Tarea pendiente 2]
[Tarea pendiente 3]
10. Autor y fecha
Campo Valor
Autor jeronimo-beep
Fecha de creación [DD/MM/AAAA]
Última actualización [DD/MM/AAAA]
Estado [En desarrollo / Prototipo funcional / Validado]