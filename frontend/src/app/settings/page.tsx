'use client';

import React from 'react';
import { Bell, User, Lock, Database, Palette, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const settingsSections = [
    {
      title: 'Konto',
      icon: <User className="w-5 h-5" />,
      items: ['Profil', 'E-Mail', 'Passwort']
    },
    {
      title: 'Benachrichtigungen',
      icon: <Bell className="w-5 h-5" />,
      items: ['E-Mail-Benachrichtigungen', 'Push-Benachrichtigungen', 'Gesprächserinnerungen']
    },
    {
      title: 'Datenschutz',
      icon: <Lock className="w-5 h-5" />,
      items: ['Datenaustausch', 'Gesprächszugriff', 'Aufnahmeeinstellungen']
    },
    {
      title: 'Speicher',
      icon: <Database className="w-5 h-5" />,
      items: ['Speichernutzung', 'Auto-Lösch-Einstellungen', 'Sicherung']
    },
    {
      title: 'Darstellung',
      icon: <Palette className="w-5 h-5" />,
      items: ['Design', 'Schriftgröße', 'Sprache']
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück</span>
        </button>
        <h1 className="text-3xl font-bold">Einstellungen</h1>
      </div>
      
      <div className="space-y-8">
        {settingsSections.map((section) => (
          <div key={section.title} className="border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer">
                  <span>{item}</span>
                  <button className="text-blue-600 hover:text-blue-800">Konfigurieren</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
