'use client';

import React from 'react';

const mockNoteData = {
  title: 'Townhall Meeting Q1',
  date: '2024-03-15',
  time: '14:00 - 16:00',
  location: 'Hauptsitz Zürich, Konferenzraum A',
  participants: {
    total: 85,
    departments: [
      'Geschäftsleitung',
      'Private Banking',
      'Investment Banking',
      'Operations',
      'IT',
      'HR'
    ]
  },
  agenda: [
    {
      time: '14:00 - 14:15',
      topic: 'Begrüßung und Q1 Highlights',
      speaker: 'CEO Martin Schneider'
    },
    {
      time: '14:15 - 14:45',
      topic: 'Finanzielle Ergebnisse Q1',
      speaker: 'CFO Anna Weber'
    },
    {
      time: '14:45 - 15:15',
      topic: 'Neue Produktinitiativen',
      speaker: 'Head of Product Development'
    },
    {
      time: '15:15 - 15:45',
      topic: 'Digitalisierungsstrategie',
      speaker: 'CTO Michael Müller'
    },
    {
      time: '15:45 - 16:00',
      topic: 'Fragen & Antworten',
      speaker: 'Alle'
    }
  ],
  keyPoints: [
    'Starkes Q1 mit 12% Wachstum im Privatkundengeschäft',
    'Neue ESG-Investmentstrategie wird im Q2 eingeführt',
    'Digitalisierungsprojekt "NextGen Banking" startet im Juni',
    'Erweiterung des Standorts Zürich geplant'
  ],
  actionItems: [
    'Präsentation der neuen ESG-Strategie an alle Teams',
    'Workshops zur Digitalisierungsinitiative planen',
    'Feedback zur Standorterweiterung einholen',
    'Nächstes Townhall für Q2 planen'
  ],
  summary: `Das Q1 Townhall Meeting zeigte positive Ergebnisse und klare Zukunftspläne. 
    Besonders hervorzuheben ist das starke Wachstum im Privatkundengeschäft und die 
    geplante Einführung der neuen ESG-Strategie. Die Digitalisierungsinitiative "NextGen Banking" 
    wurde vorgestellt und stieß auf positive Resonanz. Die Standorterweiterung in Zürich 
    wurde als notwendiger Schritt für das weitere Wachstum bestätigt.`
};

export default function NotePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockNoteData.title}</h1>
            <p className="text-gray-600">{mockNoteData.date} | {mockNoteData.time}</p>
            <p className="text-gray-600 mt-1">{mockNoteData.location}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Interne Notiz
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Teilnehmer</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Anzahl</h3>
            <p className="mt-1 text-gray-900">{mockNoteData.participants.total} Personen</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Abteilungen</h3>
            <ul className="mt-1 space-y-1">
              {mockNoteData.participants.departments.map((dept) => (
                <li key={dept} className="text-gray-900">{dept}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Agenda */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Agenda</h2>
        <div className="space-y-4">
          {mockNoteData.agenda.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="w-32 flex-shrink-0">
                <span className="text-sm font-medium text-gray-500">{item.time}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium">{item.topic}</h3>
                <p className="text-sm text-gray-500">{item.speaker}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Wichtige Punkte</h2>
        <ul className="space-y-2">
          {mockNoteData.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 mr-2">
                {index + 1}
              </span>
              <span className="text-gray-900">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Nächste Schritte</h2>
        <ul className="space-y-2">
          {mockNoteData.actionItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2">
                {index + 1}
              </span>
              <span className="text-gray-900">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Zusammenfassung</h2>
        <p className="text-gray-900 whitespace-pre-line">{mockNoteData.summary}</p>
      </div>
    </div>
  );
} 