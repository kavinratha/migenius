'use client';

import React from 'react';

const mockMeetingData = {
  title: 'Anlageberatung',
  date: '2024-03-25',
  time: '10:00 - 11:15',
  client: {
    name: 'Peter Weber',
    age: 52,
    profession: 'Selbstständiger Unternehmer',
    situation: 'Verkauf des Unternehmens steht bevor, sucht Anlagemöglichkeiten'
  },
  investment: {
    volume: '2.500.000 CHF',
    horizon: '10-15 Jahre',
    riskProfile: 'Ausgewogen bis wachstumsorientiert',
    preferences: [
      'Nachhaltige Anlagen bevorzugt',
      'Teilweise Erträge für Zusatzeinkommen',
      'Steueroptimierung erwünscht'
    ]
  },
  discussion: {
    mainTopics: [
      'Anlageziele und Risikoprofil',
      'Asset Allocation',
      'ESG-Kriterien',
      'Steuerliche Aspekte'
    ],
    products: {
      discussed: [
        'Nachhaltige Anlagefonds',
        'Direktanlagen in Aktien',
        'Strukturierte Produkte',
        'Säule 3a Wertschriftenlösung'
      ],
      recommended: [
        'Strategiefonds Nachhaltig Ausgewogen (40%)',
        'Individuelle Aktien Blue Chips (30%)',
        'Unternehmensanleihen Investment Grade (20%)',
        'Liquidität (10%)'
      ]
    }
  },
  nextSteps: [
    'Erstellung detailliertes Anlagekonzept',
    'Vorbereitung Depoteröffnung',
    'Terminvereinbarung für Vertragsunterzeichnung',
    'Kontakt mit Steuerberater'
  ],
  summary: `Herr Weber plant nach dem Verkauf seines Unternehmens eine langfristige Anlagestrategie.
    Das Anlagevolumen von 2.5 Mio. CHF soll nachhaltig und ertragsorientiert investiert werden.
    Die vorgeschlagene Strategie berücksichtigt seine Präferenz für nachhaltige Anlagen und 
    den Wunsch nach regelmäßigen Erträgen. Steueroptimierung durch schrittweisen Vermögensaufbau geplant.`
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
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.client.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Alter</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.client.age} Jahre</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Beruf</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.client.profession}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Situation</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.client.situation}</p>
          </div>
        </div>
      </div>

      {/* Investment Details */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Anlageprofil</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Anlagevolumen</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.investment.volume}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Anlagehorizont</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.investment.horizon}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Risikoprofil</h3>
            <p className="mt-1 text-gray-900">{mockMeetingData.investment.riskProfile}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Präferenzen</h3>
            <ul className="mt-1 space-y-1">
              {mockMeetingData.investment.preferences.map((pref) => (
                <li key={pref} className="text-gray-900">{pref}</li>
              ))}
            </ul>
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Empfohlene Strategie</h3>
            <ul className="space-y-2">
              {mockMeetingData.discussion.products.recommended.map((strategy) => (
                <li key={strategy} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-900">{strategy}</span>
                </li>
              ))}
            </ul>
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