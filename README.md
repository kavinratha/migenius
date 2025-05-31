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

Mehr Insights notwendig? Unter **Analytik** siehst du alles, was du zum Arbeiten brauchst - aus sowohl vorgangenen Gesprächen, als auch deine künftigen Termin.

<img width="1473" alt="Screenshot 2025-05-19 at 17 50 59" src="https://github.com/user-attachments/assets/62b9ae85-faca-49e9-a083-9c04ae488694" />

Zudem erhähltst du in deinem Dashboard einen schnellen grundlegenden Überblick, sowie konkrete Gesprächs-, Produkt- und Themenanalysen. Alle Infos auf einen Blick - weil deine Zeit wertvoll ist.

<img width="1474" alt="Screenshot 2025-05-19 at 17 52 37" src="https://github.com/user-attachments/assets/789fa0ee-d94b-4021-810b-95e271cd55a5" />
<img width="1466" alt="Screenshot 2025-05-19 at 17 52 54" src="https://github.com/user-attachments/assets/3318954c-6a51-4397-819d-535f824b83d4" />
<img width="1456" alt="Screenshot 2025-05-19 at 17 54 42" src="https://github.com/user-attachments/assets/c25cfcfb-7731-47c8-96bc-2457bca97802" />
<img width="1461" alt="Screenshot 2025-05-19 at 17 55 14" src="https://github.com/user-attachments/assets/c33da95c-1b78-4c0f-97e3-e9f9c5e06502" />



## Weitere Artefakte

## The time is now
<img width="1072" alt="Screenshot 2025-05-18 at 18 43 09" src="https://github.com/user-attachments/assets/960e31e6-e4e3-44bb-9f89-9e3ee4c4edfd" />

## Probleme gibts an folgenden Stellen
<img width="1042" alt="Screenshot 2025-05-18 at 18 45 49" src="https://github.com/user-attachments/assets/e2412e25-972e-4290-8516-c59b4ffb7365" />


## Stakeholder-Analyse
<img width="1428" alt="Screenshot 2025-05-20 at 20 02 28" src="https://github.com/user-attachments/assets/2e7b26f4-4db5-405b-9a37-10496801d2ab" />


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

<img width="1411" alt="Screenshot 2025-05-20 at 20 08 34" src="https://github.com/user-attachments/assets/cf79c0a1-eb13-4771-a086-9f3854125610" />



Der Zeitplan lässt sich damit wie folgt darstellen:
<img width="1404" alt="Screenshot 2025-05-19 at 11 54 15" src="https://github.com/user-attachments/assets/27ec58e3-0c7a-4c0e-8aeb-db1dc983b9b0" />


## Gap Analyse
<img width="1408" alt="Screenshot 2025-05-20 at 20 10 13" src="https://github.com/user-attachments/assets/890d43c3-20ba-4770-8b9b-306cac7d3ad2" />



## ----------------------------------------------






## Originalprojekt

Dieses Projekt basiert auf [Meetily - AI-Powered Meeting Assistant](https://github.com/Zackriya-Solutions/meeting-minutes) von Zackriya Solutions. Weitere Informationen zum Originalprojekt finden Sie im GitHub-Repository.

## Development Guidelines

- Follow the established project structure
- Write tests for new features
- Document API changes
- Use type hints in Python code
- Follow ESLint configuration for JavaScript/TypeScript

## Introducing Subscription

We are planning to add a subscription option so that you don't have to run the backend on your own server. This will help you scale better and run the service 24/7. This is based on a few requests we received. If you are interested, please fill out the form [here](http://zackriya.com/aimeeting/).

Last updated: March 3, 2025

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Zackriya-Solutions/meeting-minutes&type=Date)](https://star-history.com/#Zackriya-Solutions/meeting-minutes&Date)
