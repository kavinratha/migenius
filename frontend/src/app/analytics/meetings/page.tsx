'use client';

import React from 'react';

// Mock data for meetings analytics
const mockData = {
  monthlyMeetings: [
    { month: 'Jan', count: 12, avgDuration: 45 },
    { month: 'Feb', count: 15, avgDuration: 42 },
    { month: 'Mär', count: 18, avgDuration: 38 },
    { month: 'Apr', count: 14, avgDuration: 41 },
    { month: 'Mai', count: 20, avgDuration: 35 },
    { month: 'Jun', count: 22, avgDuration: 40 },
  ],
  meetingTypes: [
    { type: 'Erstgespräch', count: 45, percentage: 30 },
    { type: 'Folgegespräch', count: 60, percentage: 40 },
    { type: 'Beratung', count: 35, percentage: 23 },
    { type: 'Abschluss', count: 10, percentage: 7 },
  ],
  successMetrics: {
    completionRate: 92,
    satisfactionScore: 4.5,
    followUpRate: 78,
    avgParticipants: 2.3
  }
};

export default function MeetingsAnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Gesprächsanalyse</h1>
        <p className="text-gray-600">Detaillierte Einblicke in Ihre Kundengespräche</p>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Abschlussrate</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{mockData.successMetrics.completionRate}%</p>
            <span className="ml-2 text-sm text-green-600">+2.3%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Zufriedenheit</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{mockData.successMetrics.satisfactionScore}</p>
            <span className="ml-2 text-sm text-gray-600">/5</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Folgegespräche</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{mockData.successMetrics.followUpRate}%</p>
            <span className="ml-2 text-sm text-green-600">+5.2%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Ø Teilnehmer</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{mockData.successMetrics.avgParticipants}</p>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monatliche Entwicklung</h3>
          <div className="h-64">
            <div className="space-y-4">
              {mockData.monthlyMeetings.map((month) => (
                <div key={month.month} className="flex items-center">
                  <span className="w-12 text-sm text-gray-600">{month.month}</span>
                  <div className="flex-1 ml-4">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(month.count / 22) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-medium w-16">{month.count} Gesp.</span>
                  <span className="ml-4 text-sm text-gray-600 w-20">{month.avgDuration} Min.</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Gesprächstypen</h3>
          <div className="space-y-4">
            {mockData.meetingTypes.map((type) => (
              <div key={type.type} className="flex items-center">
                <span className="w-32 text-sm text-gray-600">{type.type}</span>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium w-16">{type.count}</span>
                <span className="ml-4 text-sm text-gray-600 w-16">{type.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 