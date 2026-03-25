# AgentIA-Vision

Proyecto de desarrollo de software usando la IA orientado al procesamiento de imágenes y la activación de un robot usando un PLC.

## 1. Monorepo Structure

*   **/backend**: NestJS 11 logic for business rules and database integration.
*   **/frontend**: Angular 21 Dashboard for real-time monitoring (http://localhost:4200).
*   **/data/dataset_raw**: Local storage for the Data Acquisition Phase (100+ images per class).
*   **/docs**: Technical manuals and architectural diagrams.

## 2. Technical Environment

*   **Node.js**: v24.11.1 (managed via **nvm**).
*   **Hardware**: **ESP32-S3-EYE** (8MB PSRAM) for optimized Edge AI inference.
*   **PLC**: Siemens S7-1200 connected via **Modbus TCP**.

## 3. Industrial Logic Mapping (Modbus TCP)

The system communicates by writing numerical values to the PLC's **Holding Register (HR40001)** via the network:

| Shape Identified | Register Value | PLC Action / Kuka Program |
| :--- | :--- | :--- |
| **Unknown / Error** | 0 | Stop / No Action |
| **Circle** | 1 | Activate Q0.0 (Kuka Program 0) |
| **Square** | 2 | Activate Q0.1 (Kuka Program 1) |
| **Rectangle** | 3 | Activate Q0.2 (Kuka Program 2) |
| **Triangle** | 4 | Activate Q0.3 (Kuka Program 3) |

## 4. Operational Workflow

1.  **Phase 0 (Data Acquisition)**: Capture and local storage of images from ESP32-S3 to PC for YOLO training.
2.  **Phase 1 (Inference)**: Real-time identification using local Python scripts within the execution container.
3.  **Phase 2 (Industrial Execution)**: Command transmission via Modbus TCP and robot movement.

## 5. Monitoring & Traceability

*   The system uses a programmatic tool to report the status (Capture, PLC Trigger, Robot Execution) to the web dashboard at **http://localhost:4200**.
