#!/bin/bash

# Default configuration
HOST="127.0.0.1"
PORT="8178"
MODEL="models/ggml-small.bin"
LANGUAGE="de"  

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --host)
            HOST="$2"
            shift 2
            ;;
        --port)
            PORT="$2"
            shift 2
            ;;
        --model)
            MODEL="$2"
            shift 2
            ;;
        # Der Sprachparameter wird nicht mehr aus der Befehlszeile übernommen,
        # sodass LANGUAGE immer auf "de" bleibt.
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Run the server
./whisper-server \
    --model "$MODEL" \
    --host "$HOST" \
    --port "$PORT" \
    -l "$LANGUAGE" \
    --diarize \
    --print-progress
