'use client';

import React from 'react';

const mockNoteData = {
  title: 'Internes Jahresgespräch 2024',
  date: '2024-03-20',
  time: '09:00 - 10:30',
  location: 'HR-Büro, 3. Stock',
  participants: {
    employee: 'Sarah Müller',
    position: 'Senior Relationship Manager',
    department: 'Private Banking',
    manager: 'Thomas Weber',
    hr: 'Lisa Schmidt'
  },
  topics: [
    {
      category: 'Leistung',
      points: [
        'Überdurchschnittliche Zielerreichung (120%)',
        'Hervorragende Kundenbewertungen',
        'Erfolgreiche Umsetzung neuer Produkte'
      ]
    },
    {
      category: 'Entwicklung',
      points: [
        'Teilnahme an Leadership-Programm',
        'Zertifizierung in ESG-Beratung',
        'Mentoring-Programm für neue Mitarbeiter'
      ]
    },
    {
      category: 'Ziele',
      points: [
        'Übernahme von Teamleitung',
        'Erweiterung des Kundenportfolios',
        'Entwicklung neuer Beratungskonzepte'
      ]
    }
  ],
  feedback: {
    strengths: [
      'Ausgezeichnete Kundenbeziehungen',
      'Starke analytische Fähigkeiten',
      'Hohe Eigeninitiative',
      'Teamplayer-Mentalität'
    ],
    areas: [
      'Delegation von Aufgaben',
      'Präsentationstechniken',
      'Zeitmanagement bei komplexen Projekten'
    ]
  },
  actionItems: [
    'Teilnahme am Leadership-Programm ab Q2',
    'ESG-Zertifizierung bis Ende Q3',
    'Regelmäßige Feedback-Gespräche mit Team',
    'Entwicklung eines neuen Beratungskonzepts'
  ],
  summary: `Das Jahresgespräch mit Frau Müller verlief sehr positiv. Ihre Leistungen im vergangenen Jahr 
    waren überdurchschnittlich, besonders in der Kundenbetreuung und Produktumsetzung. Als nächste 
    Entwicklungsschritte wurden die Teilnahme am Leadership-Programm und die ESG-Zertifizierung vereinbart. 
    Die Übernahme von mehr Führungsverantwortung wurde als realistisches Ziel für das kommende Jahr 
    identifiziert.`
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
            <h3 className="text-sm font-medium text-gray-500">Mitarbeiter</h3>
            <p className="mt-1 text-gray-900">{mockNoteData.participants.employee}</p>
            <p className="text-sm text-gray-500">{mockNoteData.participants.position}</p>
            <p className="text-sm text-gray-500">{mockNoteData.participants.department}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Vorgesetzter</h3>
            <p className="mt-1 text-gray-900">{mockNoteData.participants.manager}</p>
            <h3 className="text-sm font-medium text-gray-500 mt-4">HR</h3>
            <p className="mt-1 text-gray-900">{mockNoteData.participants.hr}</p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Gesprächsinhalte</h2>
        <div className="space-y-6">
          {mockNoteData.topics.map((topic, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium text-gray-900 mb-3">{topic.category}</h3>
              <ul className="space-y-2">
                {topic.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2">
                      {pointIndex + 1}
                    </span>
                    <span className="text-gray-900">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Feedback</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-green-700 mb-3">Stärken</h3>
            <ul className="space-y-2">
              {mockNoteData.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 mr-2">
                    ✓
                  </span>
                  <span className="text-gray-900">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-orange-600 mb-3">Entwicklungsbereiche</h3>
            <ul className="space-y-2">
              {mockNoteData.feedback.areas.map((area, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 mr-2">
                    !
                  </span>
                  <span className="text-gray-900">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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