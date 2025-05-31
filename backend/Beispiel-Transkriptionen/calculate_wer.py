import json
import re
import argparse

# Versuchen, jiwer zu importieren. Wenn es nicht gefunden wird, eine hilfreiche Nachricht ausgeben.
try:
    import jiwer
except ImportError:
    print("Fehler: Das Paket 'jiwer' wurde nicht gefunden.")
    print("Bitte installieren Sie es mit: pip install jiwer")
    exit(1)

def load_hypothesis_text(file_path):
    """Lädt den transkribierten Text direkt aus der Datei und entfernt Präfixe wie \'(speaker ?)\'."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        processed_lines = []
        for line in lines:
            line = line.strip()
            # Entferne das (speaker ?) Präfix, falls vorhanden
            if line.startswith("(speaker ?)") and len(line) > len("(speaker ?)"):
                processed_lines.append(line[len("(speaker ?)")+1:].strip()) # +1 um das Leerzeichen danach zu entfernen
            elif line: # Nur nicht-leere Zeilen hinzufügen, die kein speaker-Präfix hatten
                processed_lines.append(line)
        
        full_text = " ".join(processed_lines)
        # Einfache Normalisierung: Mehrfache Leerzeichen entfernen
        full_text = re.sub(r'\\s+', ' ', full_text).strip()

        if not full_text:
            raise ValueError("Die Hypothesendatei ist leer oder enthält keinen verarbeitbaren Text.")
        
        return full_text

    except FileNotFoundError:
        print(f"Fehler: Hypothesendatei nicht gefunden: {file_path}")
        return None
    except ValueError as ve:
        print(f"Fehler beim Verarbeiten der Hypothesendatei {file_path}: {ve}")
        return None
    except Exception as e:
        print(f"Ein unerwarteter Fehler ist beim Laden der Hypothesendatei {file_path} aufgetreten: {e}")
        return None

def load_reference_text(file_path):
    """Lädt und bereinigt den Text aus der Goldstandard-Transkriptionsdatei."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        cleaned_lines = []
        for line in lines:
            line = line.strip()
            # Sprecher-Tags entfernen (z.B. "KuBe: ", "Kundin: ")
            line = re.sub(r"^\s*\w+:\s*", "", line)
            # Inhalt in Klammern entfernen (z.B. "(lachen)")
            line = re.sub(r"\s*\(.*?\)\s*", " ", line) # Ersetze durch Leerzeichen, um Wörter nicht zu verbinden
            # Ellipsen (...) entfernen/ersetzen
            line = line.replace("...", " ")
            # Spezifische Artefakte wie "... ..." entfernen, die nach der Ellipsen-Ersetzung entstehen könnten
            line = line.replace(". .", " ") # Falls Ellipsen als ". ." interpretiert werden
            if line: # Nur nicht-leere Zeilen hinzufügen
                cleaned_lines.append(line)
        
        reference_text = " ".join(cleaned_lines)
        reference_text = re.sub(r"\s+", " ", reference_text).strip() # Überflüssige Leerzeichen entfernen
        return reference_text
    except FileNotFoundError:
        print(f"Fehler: Referenzdatei nicht gefunden unter {file_path}")
        return ""
    except Exception as e:
        print(f"Fehler beim Verarbeiten der Referenzdatei {file_path}: {e}")
        return ""

def calculate_wer(reference, hypothesis):
    """Berechnet die Wortfehlerrate mit jiwer."""
    if not reference or not hypothesis:
        print("Warnung: Referenz- oder Hypothesentext ist leer. WER-Berechnung könnte ungenau sein.")
        if not reference and not hypothesis: return 0.0 # Beide leer, 0 Fehler
        if not reference: return 1.0 # Keine Referenz, alles Fehler in Hypothese (oder unendlich, aber jiwer gibt 1)
        if not hypothesis: return 1.0 # Keine Hypothese, alles fehlt

    transform = jiwer.Compose([
        jiwer.ToLowerCase(),
        jiwer.RemoveMultipleSpaces(),
        jiwer.RemovePunctuation(),
        jiwer.Strip(),
        jiwer.ReduceToListOfListOfWords(word_delimiter=" ")
    ])

    wer = jiwer.wer(
        reference,
        hypothesis,
        truth_transform=transform,
        hypothesis_transform=transform
    )
    return wer

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Berechnet die Wortfehlerrate (WER) zwischen zwei Transkriptionsdateien.")
    parser.add_argument("hypothesis_file", help="Pfad zur Hypothesen-Transkriptionsdatei (Whisper JSON-Format).")
    parser.add_argument("reference_file", help="Pfad zur Goldstandard-Referenztranskriptionsdatei.")
    
    args = parser.parse_args()

    print(f"Lade Hypothese aus: {args.hypothesis_file}")
    hypothesis_text = load_hypothesis_text(args.hypothesis_file)
    if not hypothesis_text:
        print("Konnte Hypothesentext nicht laden. Programm wird beendet.")
        exit(1)
    print(f"Extrahierter Hypothesentext:\n---\n{hypothesis_text}\n---\n")


    print(f"Lade Referenz aus: {args.reference_file}")
    reference_text = load_reference_text(args.reference_file)
    if not reference_text:
        print("Konnte Referenztext nicht laden. Programm wird beendet.")
        exit(1)
    print(f"Extrahierter Referenztext:\n---\n{reference_text}\n---\n")

    if hypothesis_text and reference_text:
        wer_score = calculate_wer(reference_text, hypothesis_text)
        print(f"\nDie Wortfehlerrate (WER) ist: {wer_score:.2%}")
    else:
        print("\nKonnte WER nicht berechnen, da einer der Texte leer ist nach der Verarbeitung.") 