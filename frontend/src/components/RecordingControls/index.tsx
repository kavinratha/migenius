interface Props {
  isRecording: boolean;
  onRecordingStart: () => void;
  onRecordingStop: () => void;
  onTranscriptReceived: (transcript: any) => void;
  barHeights: string[];
}

export const RecordingControls = ({
  isRecording,
  onRecordingStart,
  onRecordingStop,
  barHeights,
}: Props) => {
  return (
    <div className="flex items-center space-x-4 p-4">
      {isRecording && (
        <div className="flex items-end space-x-1 h-8">
          <div
            className="w-1 bg-red-500 rounded-t transition-all duration-300"
            style={{ height: barHeights[0] }}
          ></div>
          <div
            className="w-1 bg-red-500 rounded-t transition-all duration-300"
            style={{ height: barHeights[1] }}
          ></div>
          <div
            className="w-1 bg-red-500 rounded-t transition-all duration-300"
            style={{ height: barHeights[2] }}
          ></div>
        </div>
      )}
      <button
        onClick={isRecording ? onRecordingStop : onRecordingStart}
        className={`p-4 rounded-full transition-all duration-200 ${
          isRecording
            ? 'bg-red-100 hover:bg-red-200 text-red-600'
            : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
        }`}
        title={isRecording ? 'Aufnahme stoppen' : 'Aufnahme starten'}
      >
        {isRecording ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>
    </div>
  );
}; 