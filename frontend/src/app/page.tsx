'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import { Transcript, Summary, SummaryResponse } from '@/types';
import { EditableTitle } from '@/components/EditableTitle';
import { TranscriptView } from '@/components/TranscriptView';
import { RecordingControls } from '@/components/RecordingControls';
import { AISummary } from '@/components/AISummary';
import { useSidebar } from '@/components/Sidebar/SidebarProvider';
import { listen } from '@tauri-apps/api/event';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { downloadDir } from '@tauri-apps/api/path';
import { listenerCount } from 'process';
import { invoke } from '@tauri-apps/api/core';

interface TranscriptUpdate {
  text: string;
  timestamp: string;
  source: string;
}

interface ModelConfig {
  provider: 'ollama' | 'groq' | 'claude';
  model: string;
  whisperModel: string;
}

type SummaryStatus = 'idle' | 'processing' | 'summarizing' | 'regenerating' | 'completed' | 'error';

interface OllamaModel {
  name: string;
  id: string;
  size: string;
  modified: string;
}

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [showSummary, setShowSummary] = useState(true);
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>('idle');
  const [barHeights, setBarHeights] = useState(['58%', '76%', '58%']);
  const [meetingTitle, setMeetingTitle] = useState('Neues Gespräch');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [aiSummary, setAiSummary] = useState<Summary | null>({
    Agenda: { title: "Tagesordnung", blocks: [] },
    Decisions: { title: "Entscheidungen", blocks: [] },
    ActionItems: { title: "Nächste Schritte", blocks: [] },
    ClosingRemarks: { title: "Abschließende Bemerkungen", blocks: [] }
  });
  const [summaryResponse, setSummaryResponse] = useState<SummaryResponse | null>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [summaryError, setSummaryError] = useState<string | null>(null);

  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    provider: 'ollama',
    model: 'llama3.2:latest',
    whisperModel: 'large-v3'
  });

  const [originalTranscript, setOriginalTranscript] = useState<string>('');

  const [models, setModels] = useState<OllamaModel[]>([]);
  const [error, setError] = useState<string>('');

  const modelOptions = {
    ollama: models.map(model => model.name),
    claude: ['claude-3-5-sonnet-latest'],
    groq: ['llama-3.3-70b-versatile'],
  };

  useEffect(() => {
    if (models.length > 0 && modelConfig.provider === 'ollama') {
      setModelConfig(prev => ({
        ...prev,
        model: models[0].name
      }));
    }
  }, [models]);

  const whisperModels = [
    'tiny',
    'tiny.en',
    'tiny-q5_1',
    'tiny.en-q5_1',
    'tiny-q8_0',
    'base',
    'base.en',
    'base-q5_1',
    'base.en-q5_1',
    'base-q8_0',
    'small',
    'small.en',
    'small.en-tdrz',
    'small-q5_1',
    'small.en-q5_1',
    'small-q8_0',
    'medium',
    'medium.en',
    'medium-q5_0',
    'medium.en-q5_0',
    'medium-q8_0',
    'large-v1',
    'large-v2',
    'large-v2-q5_0',
    'large-v2-q8_0',
    'large-v3',
    'large-v3-q5_0',
    'large-v3-turbo',
    'large-v3-turbo-q5_0',
    'large-v3-turbo-q8_0'
  ];

  const [showModelSettings, setShowModelSettings] = useState(false);

  const { setCurrentMeeting } = useSidebar();

  useEffect(() => {
    setCurrentMeeting({ id: 'intro-call', title: meetingTitle });
  }, [meetingTitle, setCurrentMeeting]);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setBarHeights(prev => {
          const newHeights = [...prev];
          newHeights[0] = Math.random() * 20 + 10 + 'px';
          newHeights[1] = Math.random() * 20 + 10 + 'px';
          newHeights[2] = Math.random() * 20 + 10 + 'px';
          return newHeights;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  useEffect(() => {
    let unlistenFn: (() => void) | undefined;
    let transcriptCounter = 0;  // Counter for unique IDs

    const setupListener = async () => {
      try {
        console.log('Setting up transcript listener...');
        unlistenFn = await listen<TranscriptUpdate>('transcript-update', (event) => {
          console.log('Received transcript update:', event.payload);
          const newTranscript = {
            id: `${Date.now()}-${transcriptCounter++}`,  // Combine timestamp with counter for uniqueness
            text: event.payload.text,
            timestamp: event.payload.timestamp,
          };
          setTranscripts(prev => {
            // Check if this transcript already exists
            const exists = prev.some(
              t => t.text === event.payload.text && t.timestamp === event.payload.timestamp
            );
            if (exists) {
              console.log('Duplicate transcript, skipping:', newTranscript);
              return prev;
            }
            console.log('Adding new transcript:', newTranscript);
            return [...prev, newTranscript];
          });
        });
        console.log('Transcript listener setup complete');
      } catch (error) {
        console.error('Failed to setup transcript listener:', error);
        alert('Failed to setup transcript listener. Check console for details.');
      }
    };

    setupListener();
    console.log('Started listener setup');

    return () => {
      console.log('Cleaning up transcript listener...');
      if (unlistenFn) {
        unlistenFn();
        console.log('Transcript listener cleaned up');
      }
    };
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await fetch('http://localhost:11434/api/tags', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const modelList = data.models.map((model: any) => ({
          name: model.name,
          id: model.model,
          size: formatSize(model.size),
          modified: model.modified_at
        }));
        setModels(modelList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Ollama models');
        console.error('Error loading models:', err);
      }
    };

    loadModels();
  }, []);

  const formatSize = (size: number): string => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
  };

  const handleRecordingStart = async () => {
    try {
      console.log('Starting recording...');
      const { invoke } = await import('@tauri-apps/api/core');
      
      // First check if we're already recording
      const isCurrentlyRecording = await invoke('is_recording');
      if (isCurrentlyRecording) {
        console.log('Already recording, stopping first...');
        await handleRecordingStop();
      }

      // Start new recording with whisper model
      await invoke('start_recording', {
        args: {
          whisper_model: modelConfig.whisperModel
        }
      });
      console.log('Recording started successfully');
      setIsRecording(true);
      setTranscripts([]); // Clear previous transcripts when starting new recording
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording. Check console for details.');
      setIsRecording(false); // Reset state on error
    }
  };

  const handleRecordingStop = async () => {
    try {
      console.log('Stopping recording...');
      const { invoke } = await import('@tauri-apps/api/core');
      const { appDataDir } = await import('@tauri-apps/api/path');
      
      const dataDir = await appDataDir();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const transcriptPath = `${dataDir}transcript-${timestamp}.txt`;
      const audioPath = `${dataDir}recording-${timestamp}.wav`;

      // Stop recording and save audio
      await invoke('stop_recording', { 
        args: { 
          save_path: audioPath,
          model_config: modelConfig
        }
      });
      console.log('Recording stopped successfully');

      // Format and save transcript
      const formattedTranscript = transcripts
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map(t => `[${t.timestamp}] ${t.text}`)
        .join('\n\n');

      const documentContent = `Meeting Title: ${meetingTitle}\nDate: ${new Date().toLocaleString()}\n\nTranscript:\n${formattedTranscript}`;

      await invoke('save_transcript', { 
        filePath: transcriptPath,
        content: documentContent
      });
      console.log('Transcript saved to:', transcriptPath);

      setIsRecording(false);
      
      // Show summary button if we have transcript content
      if (formattedTranscript.trim()) {
        setShowSummary(true);
      } else {
        console.log('No transcript content available');
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
      }
      alert('Failed to stop recording. Check console for details.');
      setIsRecording(false); // Reset state on error
    }
  };

  const handleTranscriptUpdate = (update: any) => {
    console.log('Handling transcript update:', update);
    const newTranscript = {
      id: Date.now().toString(),
      text: update.text,
      timestamp: update.timestamp,
    };
    setTranscripts(prev => {
      // Check if this transcript already exists
      const exists = prev.some(
        t => t.text === update.text && t.timestamp === update.timestamp
      );
      if (exists) {
        return prev;
      }
      return [...prev, newTranscript];
    });
  };

  const generateAISummary = useCallback(async () => {
    setSummaryStatus('processing');
    setSummaryError(null);

    try {
      const fullTranscript = transcripts.map(t => t.text).join('\n');
      if (!fullTranscript.trim()) {
        throw new Error('No transcript text available. Please add some text first.');
      }
      
      // Store the original transcript for regeneration
      setOriginalTranscript(fullTranscript);
      
      console.log('Generating summary for transcript length:', fullTranscript.length);
      
      // Process transcript and get process_id
      console.log('Processing transcript...');
      const response = await fetch('http://localhost:5167/process-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: fullTranscript,
          model: modelConfig.provider,
          model_name: modelConfig.model,
          chunk_size: 40000,
          overlap: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Process transcript failed:', errorData);
        setSummaryError(errorData.error || 'Failed to process transcript');
        setSummaryStatus('error');
        return;
      }

      const { process_id } = await response.json();
      console.log('Process ID:', process_id);

      // Poll for summary status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`http://localhost:5167/get-summary/${process_id}`);
          
          if (!statusResponse.ok) {
            const errorData = await statusResponse.json();
            console.error('Get summary failed:', errorData);
            setSummaryError(errorData.error || 'Unknown error');
            setSummaryStatus('error');
            clearInterval(pollInterval);
            return;
          }

          const result = await statusResponse.json();
          console.log('Summary status:', result);

          if (result.status === 'error') {
            setSummaryError(result.error || 'Unknown error');
            setSummaryStatus('error');
            clearInterval(pollInterval);
            return;
          }

          if (result.status === 'completed' && result.data) {
            clearInterval(pollInterval);
            
            // Remove MeetingName from data before formatting
            const { MeetingName, ...summaryData } = result.data;
            
            // Update meeting title if available
            if (MeetingName) {
              setMeetingTitle(MeetingName);
            }

            // Format the summary data with consistent styling
            const formattedSummary = Object.entries(summaryData).reduce((acc: Summary, [key, section]: [string, any]) => {
              acc[key] = {
                title: section.title,
                blocks: section.blocks.map((block: any) => ({
                  ...block,
                  type: 'bullet',
                  color: 'default',
                  content: block.content.trim() // Remove trailing newlines
                }))
              };
              return acc;
            }, {} as Summary);

            setAiSummary(formattedSummary);
            setSummaryStatus('completed');
          }
        } catch (error) {
          console.error('Failed to get summary status:', error);
          if (error instanceof Error) {
            setSummaryError(`Failed to get summary status: ${error.message}`);
          } else {
            setSummaryError('Failed to get summary status: Unknown error');
          }
          setSummaryStatus('error');
          clearInterval(pollInterval);
        }
      }, 5000); // Poll every 30 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(pollInterval);
      
    } catch (error) {
      console.error('Failed to generate summary:', error);
      if (error instanceof Error) {
        setSummaryError(`Failed to generate summary: ${error.message}`);
      } else {
        setSummaryError('Failed to generate summary: Unknown error');
      }
      setSummaryStatus('error');
    }
  }, [transcripts, modelConfig]);

  const handleSummary = useCallback((summary: any) => {
    setAiSummary(summary);
  }, []);

  const handleSummaryChange = (newSummary: Summary) => {
    console.log('Summary changed:', newSummary);
    setAiSummary(newSummary);
  };

  const handleTitleChange = (newTitle: string) => {
    setMeetingTitle(newTitle);
    setCurrentMeeting({ id: 'intro-call', title: newTitle });
  };

  const getSummaryStatusMessage = (status: SummaryStatus) => {
    switch (status) {
      case 'idle':
        return 'Bereit für Zusammenfassung';
      case 'processing':
        return 'Transkript wird verarbeitet...';
      case 'summarizing':
        return 'KI-Zusammenfassung wird erstellt...';
      case 'regenerating':
        return 'KI-Zusammenfassung wird neu erstellt...';
      case 'completed':
        return 'Zusammenfassung erfolgreich erstellt!';
      case 'error':
        return summaryError || 'Ein Fehler ist aufgetreten';
      default:
        return '';
    }
  };

  const handleDownloadTranscript = async () => {
    try {
      // Create transcript object with metadata
      const transcriptData = {
        title: meetingTitle,
        timestamp: new Date().toISOString(),
        transcripts: transcripts
      };

      // Generate filename
      const sanitizedTitle = meetingTitle.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${sanitizedTitle}_transcript.json`;
      
      // Get download directory path
      const downloadPath = await downloadDir();
      
      // Write file to downloads directory
      await writeTextFile(`${downloadPath}/${filename}`, JSON.stringify(transcriptData, null, 2));

      console.log('Transcript saved successfully to:', `${downloadPath}/${filename}`);
      alert('Transcript downloaded successfully!');
    } catch (error) {
      console.error('Failed to save transcript:', error);
      alert('Failed to save transcript. Please try again.');
    }
  };

  const handleUploadTranscript = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate the uploaded file structure
      if (!data.transcripts || !Array.isArray(data.transcripts)) {
        throw new Error('Invalid transcript file format');
      }

      // Update state with uploaded data
      setMeetingTitle(data.title || 'Uploaded Transcript');
      setTranscripts(data.transcripts);
      
      // Generate summary for the uploaded transcript
      handleSummary(data.transcripts);
    } catch (error) {
      console.error('Error uploading transcript:', error);
      alert('Failed to upload transcript. Please make sure the file format is correct.');
    }
  };

  const handleRegenerateSummary = useCallback(async () => {
    if (!originalTranscript.trim()) {
      console.error('No original transcript available for regeneration');
      return;
    }

    setSummaryStatus('processing');
    setSummaryError(null);

    try {
      console.log('Regenerating summary with original transcript...');
      
      // Process transcript and get process_id
      console.log('Processing transcript...');
      const response = await fetch('http://localhost:5167/process-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalTranscript,
          model: modelConfig.provider,
          model_name: modelConfig.model,
          chunk_size: 40000,
          overlap: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Process transcript failed:', errorData);
        throw new Error(errorData.error || 'Failed to process transcript');
      }

      const { process_id } = await response.json();
      console.log('Process ID:', process_id);

      // Poll for summary status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`http://localhost:5167/get-summary/${process_id}`);
          if (!statusResponse.ok) {
            const errorData = await statusResponse.json();
            console.error('Get summary failed:', errorData);
            throw new Error(errorData.error || 'Failed to get summary status');
          }

          const result = await statusResponse.json();
          console.log('Summary status:', result);

          if (result.status === 'error') {
            setSummaryError(result.error || 'Unknown error');
            setSummaryStatus('error');
            clearInterval(pollInterval);
            return;
          }

          if (result.status === 'completed' && result.data) {
            clearInterval(pollInterval);
            
            // Remove MeetingName from data before formatting
            const { MeetingName, ...summaryData } = result.data;
            
            // Update meeting title if available
            if (MeetingName) {
              setMeetingTitle(MeetingName);
            }

            // Format the summary data with consistent styling
            const formattedSummary = Object.entries(summaryData).reduce((acc: Summary, [key, section]: [string, any]) => {
              acc[key] = {
                title: section.title,
                blocks: section.blocks.map((block: any) => ({
                  ...block,
                  type: 'bullet',
                  color: 'default',
                  content: block.content.trim()
                }))
              };
              return acc;
            }, {} as Summary);

            setAiSummary(formattedSummary);
            setSummaryStatus('completed');
          } else if (result.status === 'error') {
            clearInterval(pollInterval);
            throw new Error(result.error || 'Failed to generate summary');
          }
        } catch (error) {
          clearInterval(pollInterval);
          console.error('Failed to get summary status:', error);
          if (error instanceof Error) {
            setSummaryError(error.message);
          } else {
            setSummaryError('An unexpected error occurred');
          }
          setSummaryStatus('error');
          setAiSummary(null);
        }
      }, 10000);

      return () => clearInterval(pollInterval);
    } catch (error) {
      console.error('Failed to regenerate summary:', error);
      if (error instanceof Error) {
        setSummaryError(error.message);
      } else {
        setSummaryError('An unexpected error occurred');
      }
      setSummaryStatus('error');
      setAiSummary(null);
    }
  }, [originalTranscript, modelConfig]);

  const handleCopyTranscript = useCallback(() => {
    const fullTranscript = transcripts
      .map(t => `${t.timestamp}: ${t.text}`)
      .join('\n');
    navigator.clipboard.writeText(fullTranscript);
  }, [transcripts]);

  const handleGenerateSummary = async () => {
    if (transcripts.length === 0) {
      setSummaryError("Es muss zuerst eine Transkription vorhanden sein, um eine Zusammenfassung zu generieren.");
      setSummaryStatus('error');
      return;
    }

    setSummaryError(null);
    setSummaryStatus('processing');
    setShowSummary(true);

    try {
      await generateAISummary();
    } catch (error) {
      console.error('Failed to generate summary:', error);
      if (error instanceof Error) {
        setSummaryError(error.message);
      } else {
        setSummaryError('Failed to generate summary: Unknown error');
      }
      setSummaryStatus('error');
    }
  };

  const isSummaryLoading = summaryStatus === 'processing' || summaryStatus === 'summarizing' || summaryStatus === 'regenerating';

  // State for Mock Sentiment Analysis
  const [mockSentiment, setMockSentiment] = useState({
    label: 'Neutral',
    color: 'gray',
    suggestions: [
      'Aktives Zuhören, offene Fragen stellen.',
      'Kundenbedürfnisse weiter explorieren.'
    ]
  });

  // State for Mock CRM Info
  const [crmIdInput, setCrmIdInput] = useState('');
  const [showCrmData, setShowCrmData] = useState(false);

  useEffect(() => {
    // Cycle through mock sentiments every 10 seconds
    const sentiments = [
      {
        label: 'Positiv',
        color: 'green',
        suggestions: [
          'Kunde ist zufrieden, Gespräch vertiefen.',
          'Positive Stimmung nutzen, um Zusatzprodukte anzusprechen.',
          'Zufriedenheit bestätigen und Engagement loben.'
        ]
      },
      {
        label: 'Neutral',
        color: 'gray',
        suggestions: [
          'Aktives Zuhören, offene Fragen stellen.',
          'Kundenbedürfnisse weiter explorieren.',
          'Auf nonverbale Signale achten.'
        ]
      },
      {
        label: 'Negativ',
        color: 'red',
        suggestions: [
          'Empathie zeigen, Bedenken ernst nehmen.',
          'Ursache für Unzufriedenheit klären.',
          'Lösungsorientiert argumentieren, Deeskalation anstreben.'
        ]
      },
    ];
    let currentIndex = 1; // Start with Neutral

    // Deklariere intervalId außerhalb des setIntervalls, aber innerhalb des useEffects
    let intervalId: NodeJS.Timeout | null = null; 

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % sentiments.length;
      setMockSentiment(sentiments[currentIndex]);
    }, 10000);

    // Cleanup interval on component unmount
    return () => {
      // Überprüfe, ob intervalId gesetzt ist, bevor clearInterval aufgerufen wird
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // Leeres Abhängigkeitsarray stellt sicher, dass dies nur beim Mount ausgeführt wird

  // Handler for CRM ID Input Change
  const handleCrmIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCrmIdInput(value);
    // Reset data visibility if input is cleared
    if (value.trim() === '') {
        setShowCrmData(false);
    }
  };

  // Handler for CRM ID KeyDown (Enter)
  const handleCrmKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && crmIdInput.trim() !== '') {
      setShowCrmData(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Transcript */}
        <div className="w-1/3 min-w-[300px] border-r border-gray-200 bg-white flex flex-col relative">
          {/* Title area */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <EditableTitle
                  title={meetingTitle}
                  isEditing={isEditingTitle}
                  onStartEditing={() => setIsEditingTitle(true)}
                  onFinishEditing={() => setIsEditingTitle(false)}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyTranscript}
                  disabled={transcripts.length === 0}
                  className={`px-3 py-2 border rounded-md transition-all duration-200 inline-flex items-center gap-2 shadow-sm ${
                    transcripts.length === 0
                      ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 active:bg-blue-200'
                  }`}
                  title={transcripts.length === 0 ? 'Kein Transkript verfügbar' : 'Transkript kopieren'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V7.5l-3.75-3.612z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3v3.75a.75.75 0 0 0 .75.75H18" />
                  </svg>
                  <span className="text-sm">Transkript kopieren</span>
                </button>
                {showSummary && !isRecording && (
                  <>
                    <button
                      onClick={handleGenerateSummary}
                      disabled={summaryStatus === 'processing' || transcripts.length === 0}
                      className={`px-3 py-2 border rounded-md transition-all duration-200 inline-flex items-center gap-2 shadow-sm ${
                        summaryStatus === 'processing' || transcripts.length === 0
                          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 active:bg-green-200'
                      }`}
                      title={
                        summaryStatus === 'processing'
                          ? 'Zusammenfassung wird erstellt...'
                          : transcripts.length === 0
                          ? 'Kein Transkript verfügbar'
                          : 'KI-Zusammenfassung erstellen'
                      }
                    >
                      {summaryStatus === 'processing' ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm">Verarbeitung...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-sm">Notiz erstellen</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowModelSettings(true)}
                      className="px-3 py-2 border rounded-md transition-all duration-200 inline-flex items-center gap-2 shadow-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200"
                      title="Modell-Einstellungen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Transcript content */}
          <div className="flex-1 overflow-y-auto pb-32">
            <TranscriptView transcripts={transcripts} />
          </div>

          {/* Recording controls */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-white rounded-full shadow-lg flex items-center">
              <RecordingControls
                isRecording={isRecording}
                onRecordingStop={handleRecordingStop}
                onRecordingStart={handleRecordingStart}
                onTranscriptReceived={handleTranscriptUpdate}
                barHeights={barHeights}
              />
            </div>
          </div>

          {/* Model Settings Modal */}
          {showModelSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Modell-Einstellungen</h3>
                  <button
                    onClick={() => setShowModelSettings(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zusammenfassungsmodell
                    </label>
                    <div className="flex space-x-2">
                      <select
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={modelConfig.provider}
                        onChange={(e) => {
                          const provider = e.target.value as ModelConfig['provider'];
                          setModelConfig({
                            ...modelConfig,
                            provider,
                            model: modelOptions[provider][0]
                          });
                        }}
                      >
                        <option value="claude">Claude</option>
                        <option value="groq">Groq</option>
                        <option value="ollama">Ollama</option>
                      </select>

                      <select
                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={modelConfig.model}
                        onChange={(e) => setModelConfig(prev => ({ ...prev, model: e.target.value }))}
                      >
                        {modelOptions[modelConfig.provider].map(model => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {modelConfig.provider === 'ollama' && (
                    <div>
                      <h4 className="text-lg font-bold mb-4">Verfügbare Ollama-Modelle</h4>
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                          {error}
                        </div>
                      )}
                      <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2">
                        {models.map((model) => (
                          <div 
                            key={model.id}
                            className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-colors ${
                              modelConfig.model === model.name ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setModelConfig(prev => ({ ...prev, model: model.name }))}
                          >
                            <h3 className="font-bold">{model.name}</h3>
                            <p className="text-gray-600">Size: {model.size}</p>
                            <p className="text-gray-600">Modified: {model.modified}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModelSettings(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Fertig
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side container for Summary and Sentiment */}
        <div className="flex flex-1 overflow-hidden">
          {/* AI Summary section */}
          <div className="flex-1 overflow-y-auto bg-white p-6 border-r border-gray-200">
            {isSummaryLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">KI-Zusammenfassung wird erstellt...</p>
                </div>
              </div>
            ) : showSummary && (
              <div className="max-w-4xl mx-auto p-6">
                {summaryResponse && (
                  <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 max-h-1/3 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Besprechungszusammenfassung</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium mb-1">Wichtigste Punkte</h4>
                        <ul className="list-disc pl-4">
                          {summaryResponse.summary.key_points.blocks.map((block, i) => (
                            <li key={i} className="text-sm">{block.content}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                        <h4 className="font-medium mb-1">Nächste Schritte</h4>
                        <ul className="list-disc pl-4">
                          {summaryResponse.summary.action_items.blocks.map((block, i) => (
                            <li key={i} className="text-sm">{block.content}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                        <h4 className="font-medium mb-1">Entscheidungen</h4>
                        <ul className="list-disc pl-4">
                          {summaryResponse.summary.decisions.blocks.map((block, i) => (
                            <li key={i} className="text-sm">{block.content}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                        <h4 className="font-medium mb-1">Hauptthemen</h4>
                        <ul className="list-disc pl-4">
                          {summaryResponse.summary.main_topics.blocks.map((block, i) => (
                            <li key={i} className="text-sm">{block.content}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {summaryResponse.raw_summary ? (
                      <div className="mt-4">
                        <h4 className="font-medium mb-1">Vollständige Zusammenfassung</h4>
                        <p className="text-sm whitespace-pre-wrap">{summaryResponse.raw_summary}</p>
                      </div>
                    ) : null}
                  </div>
                )}
                <div className="flex-1 overflow-y-auto p-4">
                  <AISummary 
                    summary={aiSummary} 
                    status={summaryStatus} 
                    error={summaryError}
                    onSummaryChange={(newSummary) => setAiSummary(newSummary)}
                    onRegenerateSummary={handleRegenerateSummary}
                  />
                </div>
                {summaryStatus !== 'idle' && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    summaryStatus === 'error' ? 'bg-red-100 text-red-700' :
                    summaryStatus === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    <p className="text-sm font-medium">{getSummaryStatusMessage(summaryStatus)}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NEW: Mock Sentiment Analysis section */}
          <div className="w-1/4 min-w-[280px] flex flex-col bg-gray-50">
             {/* Sentiment Analysis Div (keep its content, maybe adjust padding/margin) */}
             <div className="overflow-y-auto p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Sentimentanalyse (Echtzeit)</h3>
                {/* Sentiment Indicator */}
                <div className={`border border-${mockSentiment.color}-300 bg-${mockSentiment.color}-50 rounded-lg p-4 mb-6 shadow-sm`}>
                  <div className="flex items-center mb-2">
                    <span className={`w-3 h-3 rounded-full bg-${mockSentiment.color}-500 mr-2`}></span>
                    <div className={`text-lg font-medium text-${mockSentiment.color}-800`}>{mockSentiment.label}</div>
                  </div>
                  <div className={`w-full bg-${mockSentiment.color}-200 rounded-full h-2.5`}>
                     {/* Simple mock progress/intensity bar */}
                     <div className={`bg-${mockSentiment.color}-500 h-2.5 rounded-full`} style={{ width: mockSentiment.label === 'Positiv' ? '75%' : mockSentiment.label === 'Neutral' ? '50%' : '25%' }}></div>
                  </div>
                </div>

                {/* Suggestions Area */}
                <div className="flex-1 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Vorschläge für Sie:</h4>
                  {mockSentiment.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start p-3 bg-white rounded-md border border-gray-200 text-sm text-gray-700 shadow-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-4 w-4 mr-2 text-${mockSentiment.color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {suggestion}
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 mt-6 text-center">(Mock-Daten - keine echte Analyse)</p>
             </div>

             {/* NEW: Mock CRM Info section */}
             <div className="border-t border-gray-200 p-6 mt-auto bg-white">
                 <h3 className="text-lg font-semibold mb-4 text-gray-800">Kundeninfo (Finnova CRM)</h3>
                 <div className="mb-4">
                     <label htmlFor="crmId" className="block text-sm font-medium text-gray-700 mb-1">
                         CRM-Nummer
                     </label>
                     <input
                         type="text"
                         id="crmId"
                         value={crmIdInput}
                         onChange={handleCrmIdChange}
                         onKeyDown={handleCrmKeyDown}
                         placeholder="Nummer eingeben & Enter..."
                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                     />
                 </div>

                 {showCrmData && (
                     <div className="space-y-2 p-4 bg-white rounded-md border border-gray-200 shadow-sm text-sm">
                         <h4 className="text-sm font-semibold text-gray-600 mb-2">Kundendetails (Mock-Daten):</h4>
                         <div><span className="font-medium text-gray-500 w-28 inline-block">Name:</span> Max Mustermann</div>
                         <div><span className="font-medium text-gray-500 w-28 inline-block">Kundennr:</span> {crmIdInput || '12345'}</div>
                         <div><span className="font-medium text-gray-500 w-28 inline-block">Letzter Kontakt:</span> 15.03.2024</div>
                         <div><span className="font-medium text-gray-500 w-28 inline-block">Segment:</span> Privatkunde Plus</div>
                         <div><span className="font-medium text-gray-500 w-28 inline-block">Hauptprodukt:</span> Hypothek XYZ</div>
                         <div><span className="font-medium text-gray-500 w-28 inline-block">Potenzial:</span> Hoch (Anlage)</div>
                     </div>
                 )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
