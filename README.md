<div align="center" style="border-bottom: none">
    <h1>
        <!-- Optional: Replace with a relevant image if you have one -->
        <!-- <img src="docs/6.png" width="400" style="border-radius: 10px;" /> -->
        <br>
        MiGenius: Echtzeit-Transkription und intelligente Zusammenfassung von Meetings
    </h1>
    <br>
    <!-- Optional: Badges anpassen oder entfernen -->
    <!-- <a href="https://github.com/Zackriya-Solutions/meeting-minutes/releases/tag/v0.0.3"><img src="https://img.shields.io/badge/Pre_Release-v0.0.3-brightgreen" alt="Pre-Release"></a> -->
    <!-- <a href="https://github.com/Zackriya-Solutions/meeting-minutes/releases/tag/v0.0.3"><img src="https://img.shields.io/badge/Stars-1000+-red" alt="Stars"></a> -->
    <!-- <a href="https://github.com/Zackriya-Solutions/meeting-minutes/releases/tag/v0.0.3"><img src="https://img.shields.io/badge/License-MIT-blue" alt="License"></a> -->
    <!-- <a href="https://github.com/Zackriya-Solutions/meeting-minutes/releases/tag/v0.0.3"><img src="https://img.shields.io/badge/Supported_OS-macOS,_Windows-yellow" alt="Supported OS"></a> -->
    <br>
    <h3>
    <br>
    Ein KI-gestützter Meeting-Assistent für automatische Transkription und Zusammenfassung
    </h3>
    <!-- Entfernte Links
    <p align="center">
    <a href="https://meetily.zackriya.com"><b>Website</b></a> •
    <a href="https://in.linkedin.com/company/zackriya-solutions"><b>Author</b></a>
    •
    <a href="https://discord.gg/crRymMQBFH"><b>Discord Channel</b></a>
</p>
    -->
    <p align="center">
    Ein KI-gestützter Meeting-Assistent, der Audio von Besprechungen live aufnimmt, in Echtzeit transkribiert und Zusammenfassungen erstellt. Dies spart Bankberatern wertvolle Zeit und erhöht die Transparenz von Beratungsgesprächen, da Diskussionen automatisch erfasst und organisiert werden, ohne dass externe Server benötigt werden.
</p>

<p align="center">
    <img src="docs/Dashboard%20Migenius.png" width="650" alt="Migenius Dashboard Screenshot" />
    <br>
    <!-- <a href="https://youtu.be/5k_Q5Wlahuk">View full Demo Video</a> -->
</p>

</div>

## Projektkontext

Dieses Projekt entstand im Rahmen einer Lehrveranstaltung am **Institut für Wirtschaftsinformatik der Universität St. Gallen** in Zusammenarbeit mit der **Migros Bank**. Ziel war die Entwicklung eines Proof-of-Concepts für eine automatische Meeting-Transkriptionslösung.

Es basiert auf dem Open-Source-Projekt [Meetily - AI-Powered Meeting Assistant](https://github.com/Zackriya-Solutions/meeting-minutes) von Zackriya Solutions, wurde jedoch für diesen spezifischen Anwendungsfall angepasst und erweitert.

## Herausforderung & Ansatz (Challenge & Approach)

**Challenge:** «How to enhance and automate meeting transcription and summarization processes?»

**Approach:**

*   **Transcription & Speaker Differentiation:**
    *   Entwicklung einer KI-basierten Lösung zur Transkription von Meeting-Gesprächen (on-site und online).
    *   Automatische Differenzierung verschiedener Sprecher basierend auf Stimmerkennung (In Arbeit).
    *   Generierung von automatisierten Meeting-Zusammenfassungen zur Verbesserung der Informationszugänglichkeit.
*   **Proof-of-Concept:**
    *   Nutzung von Generativer KI (Whisper oder ähnlich) für hohe Transkriptionsgenauigkeit.
    *   Implementierung als Cloud-basierte Lösung mit Option für On-Premise-Deployment zur Erfüllung von Sicherheits- und Compliance-Anforderungen.
    *   Design und Evaluierung eines Prototyps für automatisierte Meeting-Transkription und -Zusammenfassung.
    *   Testen verschiedener KI-Modelle für Sprechererkennung und Zusammenfassung.

## Aktueller Stand & Anpassungen

Dieser Prototyp implementiert folgende Kernfunktionen:

*   ✅ **Echtzeit-Audioaufnahme:** Erfasst Mikrofon- und Systemaudio.
*   ✅ **Live-Transkription:** Nutzt Whisper.cpp für die lokale Transkription.
    *   ✅ **Erweiterung:** Integration eines Whisper-Modells, das für **Schweizerdeutsch** trainiert wurde.
*   ✅ **Lokale Verarbeitung:** Gewährleistet Datenschutz, da keine Daten an externe Server gesendet werden.
*   ✅ **Angepasstes Frontend:** Die Benutzeroberfläche wurde angepasst.
*   ✅ **Zusammenfassungen:** Generiert automatische Zusammenfassungen mittels LLMs.
    *   ⚠️ **Hinweis:** Die Zusammenfassung erfolgt aktuell über eine **API (Cloud)**, da die benötigte Rechenleistung für grosse Modelle auf lokalen Geräten oft nicht ausreicht. Eine Ausführung auf einer **Private Cloud** wäre alternativ möglich.
*   ✅ **Plattformunterstützung:** Läuft unter macOS und Windows.

### Architekturdiagramm

Die beiden Diagramme solen für non-tech und tech Stakeholder den grundlegenden Aufbau von Migenius veranschaulichen.

<img width="1425" alt="Screenshot 2025-05-17 at 15 48 43" src="https://github.com/user-attachments/assets/9a099fc9-2653-4c6a-895c-fef64cc975aa" />


Das Architekturdiagramm visualisiert vereinfacht und modular die zentralen Verarbeitungsschritte: Audioaufnahme → Transkription mit Whisper → Generierung der Zusammenfassung durch ein LLM → Ausgabe.
<img width="1039" alt="Architekur_Detail png" src="https://github.com/user-attachments/assets/c01f341d-70a4-4c16-9371-94d5fe440355" />


Dieses Diagramm legt den Fouks auf eine Detaillierte Ansicht bezüglich den verwendeten Diensten.
### Limitationen: Laufende Arbeiten & Nächste Schritte

*   🚧 **Sprecherunterscheidung (Speaker Diarization):** Aktive Entwicklung zur automatischen Identifizierung verschiedener Sprecher im Transkript.
*   🚧 **Export-Funktionen:** Hinzufügen von Exportoptionen für Transkripte und Zusammenfassungen (z.B. Markdown, PDF).
*   🚧 **Schweizerdeutsche Unterstützung:** Schwächen bei Dialekten sind auf das fehlen grosser Modelle für Schweizerdeutsch zurückzuführen. deshalb müsste in grossen Stil Trainingsdaten gesammelt und gelabelt werden.
*   🚧 **Rand-Cases:** Begrenzte Modellgenauigkeit bei kurzen, chaotischen oder inhaltsarmen Audios.
*   🚧 **Hoher Rechenaufwand:** Hoher Ressourcenbedarf bei LLM-Zusammenfassungen auf lokalen Geräten erfordert entweder Private-Cloud oder sehr leistungsfähige persönliche Ausrüstung.
*   🚧 **Model-Einschränkungen:** Nicht immer exakte Erkennung bei Speaker-Überlappung, Hintergrundgeräuschen, etc. suggerieren künftige Benutzung eines leistungsfäherigen Models.
*   Weitere Verbesserungen basierend auf dem ursprünglichen Projekt (siehe unten).

## Set Up

Analog zum originalen Projekt, i.c. mit OpenAI:

```bash
# Navigate to frontend directory
cd frontend

# Give execute permissions to clean_build.sh
chmod +x clean_build.sh

# run clean_build.sh
./clean_build.sh
```

### 2. Backend Setup

```bash
# Clone the repository
git clone https://github.com/Zackriya-Solutions/meeting-minutes.git
cd meeting-minutes/backend

# Create and activate virtual environment
# On macOS/Linux:
python -m venv venv
source venv/bin/activate

# On Windows:
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Add environment file with API keys
# On macOS/Linux:
echo -e "OPENAI_API_KEY=your_api_key" | tee .env

# On Windows (PowerShell):
"OPENAI_API_KEY=your_api_key" | Out-File -FilePath .env -Encoding utf8

# Configure environment variables for Groq
# On macOS/Linux:
export OPENAI_API_KEY=your_openai_api_key

# On Windows (PowerShell):
$env:OPENAI_API_KEY="your_openai_api_key"

# Build dependencies
# On macOS/Linux:
chmod +x build_whisper.sh
./build_whisper.sh

# On Windows:
.\build_whisper.bat

# Start backend servers
# On macOS/Linux:
./clean_start_backend.sh

# On Windows:
.\start_with_output.ps1
```
## Benutzerhandbuch



Starte die **Transkription** einer neue Aufnahme, indem du auf den Aufnahme-Button drückst.
<img width="1477" alt="Screenshot 2025-05-19 at 17 41 39" src="https://github.com/user-attachments/assets/b81c3766-def3-4154-96cc-758cf47b0df1" />

Danach beginnt MiGenius, das Gespräch zu transkribieren.
<img width="1474" alt="Screenshot 2025-05-19 at 17 43 56" src="https://github.com/user-attachments/assets/c733f1b6-dfec-4167-904d-fa488610d3d9" />

Wähle ein Sprachmodell zur **Summarization** aus.
<img width="1470" alt="Screenshot 2025-05-19 at 17 44 46" src="https://github.com/user-attachments/assets/fb0211c2-f490-4f04-810f-feb7e374cb66" />

Verwenden die generierten Insights und die gesparte Zeit, um dich dem zu widmen, was wirklich zählt!
<img width="1483" alt="Screenshot 2025-05-19 at 17 45 36" src="https://github.com/user-attachments/assets/a5c6c5cb-516d-4316-af98-eb48fa7062cd" />

Schnelle und fundierte Entscheidungen gefällig? Nutze die Summarizations aus der Konversationshistorie und deinen persönlichen Notizen!
<img width="1459" alt="Screenshot 2025-05-19 at 17 46 54" src="https://github.com/user-attachments/assets/6d6fcc28-9ec6-488f-880f-f7a71299d018" />

<img width="1471" alt="Screenshot 2025-05-19 at 17 48 32" src="https://github.com/user-attachments/assets/b3973901-5fcf-4687-a995-e7e2f6a52174" />


## Weitere Artefakte

## The time is now
<img width="1072" alt="Screenshot 2025-05-18 at 18 43 09" src="https://github.com/user-attachments/assets/960e31e6-e4e3-44bb-9f89-9e3ee4c4edfd" />

## Probleme gibts an folgenden Stellen
<img width="1042" alt="Screenshot 2025-05-18 at 18 45 49" src="https://github.com/user-attachments/assets/e2412e25-972e-4290-8516-c59b4ffb7365" />


## Stakeholder-Analyse
Bild

> **Value Proposition Canvas**
<img width="1431" alt="Screenshot 2025-05-17 at 16 06 42" src="https://github.com/user-attachments/assets/a8ca0881-6629-4bad-ad61-443c43d0693c" />
<img width="1417" alt="Screenshot 2025-05-17 at 16 07 34" src="https://github.com/user-attachments/assets/a53238b8-5451-4bdd-849c-e1f4e536d9e2" />
<img width="1416" alt="Screenshot 2025-05-17 at 16 07 57" src="https://github.com/user-attachments/assets/93c2422f-2265-4fff-a449-a824283f71f0" />

## Data Canvas
<img width="1440" alt="Screenshot 2025-05-17 at 16 09 16" src="https://github.com/user-attachments/assets/e7205705-da29-45ba-b44f-0d974436c1ee" />

## Business Case
<img width="1388" alt="Screenshot 2025-05-19 at 11 53 53" src="https://github.com/user-attachments/assets/942a62a5-26e2-46a4-ae18-262a0c21a33e" />


## Projektplanung und Roadmap
<img width="1418" alt="Screenshot 2025-05-17 at 17 48 33" src="https://github.com/user-attachments/assets/e39324b4-8ada-4fc2-a893-6b5083bc16c6" />

Der intiale Plan wurde entlang des Projektes kontinuirlich angepasst, jedoch blieben Anforderungen von der Migros Bank als auch aus dem universitären Rahmen ausschlaggebend.

<img width="1410" alt="Screenshot 2025-05-19 at 17 06 11" src="https://github.com/user-attachments/assets/1c6c1734-0867-48cb-ba8a-74bdb47eca49" />


Der Zeitplan lässt sich damit wie folgt darstellen:
<img width="1404" alt="Screenshot 2025-05-19 at 11 54 15" src="https://github.com/user-attachments/assets/27ec58e3-0c7a-4c0e-8aeb-db1dc983b9b0" />


## Gap Analyse


<img width="1127" alt="Screenshot 2025-05-19 at 07 22 05" src="https://github.com/user-attachments/assets/a0b65f30-6c8c-4a5f-b5cf-4f15b898ab86" />


<img width="1126" alt="Screenshot 2025-05-19 at 07 22 20" src="https://github.com/user-attachments/assets/636e39a0-ebc7-44df-9c1d-266677f2959c" />




## ----------------------------------------------








## Basierend auf Meetily (Original Projektinformation)

Die folgenden Abschnitte beschreiben die Architektur, Features und Setup-Anweisungen des ursprünglichen "Meetily"-Projekts, auf dem diese Arbeit basiert.

> **Note**: We have a Rust-based implementation that explores better performance and native integration. It currently implements:
> - ✅ Real-time audio capture from both microphone and system audio
> - ✅ Live transcription using locally-running Whisper
> - ✅ Speaker diarization
> - ✅ Rich text editor for notes
>
> We are currently working on:
> - ✅ Export to Markdown/PDF
> - ✅ Export to HTML

## Release 0.0.3 (Original Project)

A new release is available!

Please check out the release [here](https://github.com/Zackriya-Solutions/meeting-minutes/releases/tag/v0.0.3).

### What's New
- **Windows Support**: Fixed audio capture issues on Windows
- **Improved Error Handling**: Better error handling and logging for audio devices
- **Enhanced Device Detection**: More robust audio device detection across platforms
- **Windows Installers**: Added both .exe and .msi installers for Windows
- Transcription quality is improved
- Bug fixes and improvements for frontend
- Better backend app build process
- Improved documentation

### What would be next? (Original Project)
- Database connection to save meeting minutes
- Improve summarization quality for smaller LLM models
- Add download options for meeting transcriptions 
- Add download option for summary

### Known issues (Original Project)
- Smaller LLMs can hallucinate, making summarization quality poor; Please use model above 32B parameter size
- Backend build process requires CMake, C++ compiler, etc. Making it harder to build
- Backend build process requires Python 3.10 or newer
- Frontend build process requires Node.js

## LLM Integration (Original Project Configuration)

The backend supports multiple LLM providers through a unified interface. Current implementations include:

### Supported Providers
- **Anthropic** (Claude models)
- **Groq** (Llama3.2 90 B)
- **Ollama** (Local models that supports function calling)

### Configuration
Create `.env` file with your API keys:
```env
# Required for Anthropic
ANTHROPIC_API_KEY=your_key_here  

# Required for Groq 
GROQ_API_KEY=your_key_here

```

## System Architecture (Original Project)

![High Level Architecture](docs/HighLevel.jpg)

### Core Components

1. **Audio Capture Service**
   - Real-time microphone/system audio capture
   - Audio preprocessing pipeline
   - Built with Rust (experimental) and Python

2. **Transcription Engine**
   - Whisper.cpp for local transcription
   - Supports multiple model sizes (tiny->large)
   - GPU-accelerated processing

3. **LLM Orchestrator**
   - Unified interface for multiple providers
   - Automatic fallback handling
   - Chunk processing with overlap
   - Model configuration:

4. **Data Services**
   - **ChromaDB**: Vector store for transcript embeddings
   - **SQLite**: Process tracking and metadata storage

5. **API Layer**
   - FastAPI endpoints:
     - POST /upload
     - POST /process
     - GET /summary/{id}
     - DELETE /summary/{id}

### Deployment Architecture

- **Frontend**: Tauri app + Next.js (packaged executables)
- **Backend**: Python FastAPI:
  - Transcript workers
  - LLM inference

## Prerequisites (Original Project)

- Node.js 18+
- Python 3.10+
- FFmpeg
- Rust 1.65+ (for experimental features)
- Cmake 3.22+ (for building the frontend)
- For Windows: Visual Studio Build Tools with C++ development workload

## Setup Instructions (Original Project)

### 1. Frontend Setup

#### Run packaged version

Go to the [releases page](https://github.com/Zackriya-Solutions/meeting-minutes/releases) and download the latest version.

**For Windows:**
- Download either the `.exe` installer or `.msi` package
- Once the installer is downloaded, double-click the executable file to run it
- Windows will ask if you want to run untrusted apps, click "More info" and choose "Run anyway"
- Follow the installation wizard to complete the setup
- The application will be installed and available on your desktop

**For macOS:**
- Download the `dmg_darwin_arch64.zip` file
- Extract the file
- Double-click the `.dmg` file inside the extracted folder
- Drag the application to your Applications folder
- Execute the following command in terminal to remove the quarantine attribute:
  ```
  xattr -c /Applications/meeting-minutes-frontend.app
  ```

Provide necessary permissions for audio capture and microphone access.

#### Dev run

```bash
# Navigate to frontend directory
cd frontend

# Give execute permissions to clean_build.sh
chmod +x clean_build.sh

# run clean_build.sh
./clean_build.sh
```

### 2. Backend Setup

```bash
# Clone the repository
git clone https://github.com/Zackriya-Solutions/meeting-minutes.git
cd meeting-minutes/backend

# Create and activate virtual environment
# On macOS/Linux:
python -m venv venv
source venv/bin/activate

# On Windows:
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Add environment file with API keys
# On macOS/Linux:
echo -e "ANTHROPIC_API_KEY=your_api_key\nGROQ_API_KEY=your_api_key" | tee .env

# On Windows (PowerShell):
"ANTHROPIC_API_KEY=your_api_key`nGROQ_API_KEY=your_api_key" | Out-File -FilePath .env -Encoding utf8

# Configure environment variables for Groq
# On macOS/Linux:
export GROQ_API_KEY=your_groq_api_key

# On Windows (PowerShell):
$env:GROQ_API_KEY="your_groq_api_key"

# Build dependencies
# On macOS/Linux:
chmod +x build_whisper.sh
./build_whisper.sh

# On Windows:
.\build_whisper.bat

# Start backend servers
# On macOS/Linux:
./clean_start_backend.sh

# On Windows:
.\start_with_output.ps1
```

## Development Guidelines

- Follow the established project structure
- Write tests for new features
- Document API changes
- Use type hints in Python code
- Follow ESLint configuration for JavaScript/TypeScript

## Contributing (Original Project)

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License (Original Project)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements (Original Project)

-   Whisper.cpp for the transcription engine
-   Tauri for the cross-platform desktop framework
-   Next.js for the frontend framework
-   ChromaDB for the vector store
-   FastAPI for the backend framework

---
*Dieses README wurde angepasst, um den Kontext des Studentenprojekts der Universität St. Gallen und der Migros Bank widerzuspiegeln.*

## Introducing Subscription

We are planning to add a subscription option so that you don't have to run the backend on your own server. This will help you scale better and run the service 24/7. This is based on a few requests we received. If you are interested, please fill out the form [here](http://zackriya.com/aimeeting/).

Last updated: March 3, 2025

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Zackriya-Solutions/meeting-minutes&type=Date)](https://star-history.com/#Zackriya-Solutions/meeting-minutes&Date)
