'use client';

import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Überblick</h1>
        <p className="text-gray-600">Zusammenfassung aller wichtigen Kennzahlen</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Gespräche diesen Monat</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">48</p>
            <span className="ml-2 text-sm text-green-600">+12%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Aktive Produkte</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">12</p>
            <span className="ml-2 text-sm text-green-600">+2</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Durchschnittliche Bewertung</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">4.8</p>
            <span className="ml-2 text-sm text-gray-600">/5</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Letzte Aktivitäten</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Neues Gespräch</p>
                <p className="text-sm text-gray-600">Hypothekenberatung</p>
              </div>
              <span className="text-sm text-gray-500">Vor 2h</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Produktupdate</p>
                <p className="text-sm text-gray-600">Sparkonto Plus</p>
              </div>
              <span className="text-sm text-gray-500">Vor 5h</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Abgeschlossen</p>
                <p className="text-sm text-gray-600">Anlagefonds-Beratung</p>
              </div>
              <span className="text-sm text-gray-500">Vor 1d</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Schnellzugriff</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <h4 className="font-medium mb-1">Gesprächsanalyse</h4>
              <p className="text-sm text-gray-600">Details zu allen Gesprächen</p>
            </button>
            <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <h4 className="font-medium mb-1">Produktanalyse</h4>
              <p className="text-sm text-gray-600">Produktperformance einsehen</p>
            </button>
            <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <h4 className="font-medium mb-1">Themenanalyse</h4>
              <p className="text-sm text-gray-600">Aktuelle Thementrends</p>
            </button>
            <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <h4 className="font-medium mb-1">Berichte</h4>
              <p className="text-sm text-gray-600">Monatliche Auswertungen</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 