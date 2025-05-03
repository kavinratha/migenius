'use client';

import React from 'react';

const mockMeetingData = {
  title: 'Hypothekenberatung',
  date: '2024-03-26',
  time: '14:00 - 15:30',
  client: {
    name: 'Familie Müller',
    participants: ['Thomas Müller', 'Sarah Müller'],
    situation: 'Erstes Eigenheim, Neubau in Winterthur'
  },
  property: {
    type: 'Einfamilienhaus',
    price: '1.250.000 CHF',
    location: 'Winterthur',
    livingSpace: '160m²'
  },
  discussion: {
    mainTopics: [
      'Finanzierungsbedarf und Eigenkapital',
      'Verschiedene Hypothekarmodelle',
      'Tragbarkeitsberechnung',
      'Amortisation'
    ],
    products: {
      discussed: [
        'SARON Hypothek',
        'Festhypothek 5 Jahre',
        'Festhypothek 10 Jahre'
      ],
      recommended: 'Kombination aus SARON (40%) und Festhypothek 10 Jahre (60%)'
    }
  },
  nextSteps: [
    'Einreichung der Lohnausweise',
    'Detaillierte Tragbarkeitsberechnung',
    'Vorbereitung des Finanzierungsantrags',
    'Folgetermin in einer Woche'
  ],
  summary: `Familie Müller sucht Finanzierung für ihr erstes Eigenheim in Winterthur. 
    Kaufpreis 1.25 Mio. CHF, verfügbares Eigenkapital 300.000 CHF (davon 200.000 CHF aus der Pensionskasse).
    Nach ausführlicher Beratung tendieren sie zu einer Kombination aus SARON und Festhypothek, 
    um von aktuell günstigen Konditionen zu profitieren und gleichzeitig langfristige Planungssicherheit zu haben.`
};

export default function MeetingPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockMeetingData.title}</h1>
            <p className="text-gray-600">{mockMeetingData.date} | {mockMeetingData.time}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Abgeschlossen
          </span>
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Kundeninformation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Kunden</h3>
            <ul className="mt-1 space-y-1">
              {mockMeetingData.client.participants.map((participant) => (
                <li key={participant} className="text-gray-900">{participant}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Situation</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.client.situation}</p>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Objektdetails</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Objekttyp</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.property.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Kaufpreis</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.property.price}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Standort</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.property.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Wohnfläche</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.property.livingSpace}</p>
          </div>
        </div>
      </div>

      {/* Discussion Topics */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Gesprächsinhalte</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Hauptthemen</h3>
            <ul className="list-disc list-inside space-y-1">
              {mockMeetingData.discussion.mainTopics.map((topic) => (
                <li key={topic} className="text-gray-900">{topic}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Besprochene Produkte</h3>
            <div className="flex flex-wrap gap-2">
              {mockMeetingData.discussion.products.discussed.map((product) => (
                <span
                  key={product}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Empfehlung</h3>
            <p className="text-gray-900">{mockMeetingData.discussion.products.recommended}</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Nächste Schritte</h2>
        <ul className="space-y-2">
          {mockMeetingData.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2">
                {index + 1}
              </span>
              <span className="text-gray-900">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Meeting Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Zusammenfassung</h2>
        <p className="text-gray-900 whitespace-pre-line">{mockMeetingData.summary}</p>
      </div>
    </div>
  );
} 