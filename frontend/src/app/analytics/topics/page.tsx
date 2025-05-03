'use client';

import React from 'react';

// Mock data for topics analytics
const mockData = {
  topTopics: [
    { name: 'Eigenheim', mentions: 245, sentiment: 85, trend: '+15%' },
    { name: 'Altersvorsorge', mentions: 198, sentiment: 78, trend: '+8%' },
    { name: 'Investment', mentions: 176, sentiment: 72, trend: '+12%' },
    { name: 'Nachhaltigkeit', mentions: 156, sentiment: 88, trend: '+25%' },
    { name: 'Digitalisierung', mentions: 134, sentiment: 65, trend: '-5%' },
  ],
  topicConnections: [
    { primary: 'Eigenheim', related: ['Hypothek', 'Vorsorge', 'Versicherung'], strength: 85 },
    { primary: 'Investment', related: ['Nachhaltigkeit', 'Risiko', 'Rendite'], strength: 72 },
    { primary: 'Vorsorge', related: ['Pension', 'Sicherheit', 'Zukunft'], strength: 68 },
    { primary: 'Finanzierung', related: ['Kredit', 'Budget', 'Planung'], strength: 63 },
  ],
  monthlyTopics: [
    { month: 'Januar', topics: ['Eigenheim', 'Investment', 'Vorsorge'] },
    { month: 'Februar', topics: ['Nachhaltigkeit', 'Digitalisierung', 'Eigenheim'] },
    { month: 'März', topics: ['Vorsorge', 'Investment', 'Nachhaltigkeit'] },
    { month: 'April', topics: ['Eigenheim', 'Digitalisierung', 'Investment'] },
    { month: 'Mai', topics: ['Nachhaltigkeit', 'Vorsorge', 'Eigenheim'] },
    { month: 'Juni', topics: ['Investment', 'Eigenheim', 'Digitalisierung'] },
  ]
};

export default function TopicsAnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Themenanalyse</h1>
        <p className="text-gray-600">Analyse der besprochenen Themen und ihrer Zusammenhänge</p>
      </div>

      {/* Top Topics */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Top Themen</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {mockData.topTopics.map((topic) => (
              <div key={topic.name} className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{topic.name}</span>
                    <span className={`ml-2 text-sm ${topic.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {topic.trend}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{topic.mentions} Erwähnungen</span>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(topic.mentions / mockData.topTopics[0].mentions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${topic.sentiment}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Häufigkeit</span>
                  <span className="text-xs text-gray-500">Sentiment: {topic.sentiment}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Topic Connections */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Themenverbindungen</h3>
          <div className="space-y-6">
            {mockData.topicConnections.map((connection) => (
              <div key={connection.primary} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{connection.primary}</span>
                  <span className="text-sm text-gray-600">{connection.strength}% Korrelation</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {connection.related.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Topic Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monatliche Trends</h3>
          <div className="space-y-4">
            {mockData.monthlyTopics.map((month) => (
              <div key={month.month} className="space-y-2">
                <span className="text-sm font-medium">{month.month}</span>
                <div className="flex flex-wrap gap-2">
                  {month.topics.map((topic, index) => (
                    <span
                      key={topic}
                      className={`px-2 py-1 text-sm rounded-full ${
                        index === 0
                          ? 'bg-blue-100 text-blue-800'
                          : index === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 