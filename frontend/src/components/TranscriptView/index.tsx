import { Transcript } from '@/types';

interface Props {
  transcripts: Transcript[];
}

export const TranscriptView = ({ transcripts }: Props) => {
  if (transcripts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p className="text-lg mb-2">Kein Transkript verfügbar</p>
        <p className="text-sm">Starten Sie die Aufnahme, um ein Transkript zu erstellen</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {transcripts.map((transcript) => (
        <div key={transcript.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">{transcript.timestamp}</div>
          <div className="text-gray-700">{transcript.text}</div>
        </div>
      ))}
    </div>
  );
}; 