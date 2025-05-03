'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, Plus, FolderOpen, BarChart3, Clock, Users, User } from 'lucide-react';
import Link from 'next/link';

export default function StartPage() {
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Hypothekenberatung - Familie Müller',
      date: '2024-03-28T10:00:00',
      duration: 60,
      type: 'Beratungsgespräch',
      location: 'Büro 103'
    },
    {
      id: 2,
      title: 'Anlageberatung - Hr. Schmidt',
      date: '2024-03-29T14:30:00',
      duration: 45,
      type: 'Beratungsgespräch',
      location: 'Videogespräch'
    },
    {
      id: 3,
      title: 'Teammeeting - Q1 Review',
      date: '2024-03-30T09:00:00',
      duration: 90,
      type: 'Intern',
      location: 'Konferenzraum 2'
    }
  ]);
  
  const [recentEvents, setRecentEvents] = useState([
    {
      id: 1,
      title: 'Anlageberatung - Familie Weber',
      date: '2024-03-20T14:30:00',
      type: 'Kundengespräch',
      summary: 'Beratung zu ETF-Portfolios und langfristigen Anlageprodukten',
      products: ['ETF', 'Fondsanlage']
    },
    {
      id: 2,
      title: 'Kontoeröffnung - Hr. Becker',
      date: '2024-03-15T11:00:00',
      type: 'Kundengespräch',
      summary: 'Eröffnung eines Girokontos und Beratung zu digitalen Diensten',
      products: ['Girokonto', 'Online-Banking']
    },
    {
      id: 3,
      title: 'Monatliche Produktschulung',
      date: '2024-03-10T09:00:00',
      type: 'Intern',
      summary: 'Schulung zu neuen Anlageprodukten und Marketingmaterialien',
      products: []
    }
  ]);

  useEffect(() => {
    // Get username from system
    const getUserName = async () => {
      try {
        const userInfo = await fetch('/api/user-info');
        const data = await userInfo.json();
        setUsername(data.username);
      } catch (error) {
        setUsername('Benutzer'); // Fallback if API call fails
      }
    };
    getUserName();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Greeting and Search */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          Hallo, {username}
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Suchen Sie nach Gesprächen, Notizen oder Analysen..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/meetings" className="flex flex-col items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Plus className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-blue-700">Gespräche</h3>
          <p className="text-sm text-blue-600 text-center mt-2">Neues Gespräch aufnehmen oder bestehende anzeigen</p>
        </Link>

        <Link href="/notes" className="flex flex-col items-center p-6 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-emerald-700">Notizen</h3>
          <p className="text-sm text-emerald-600 text-center mt-2">Neue Notiz erstellen oder bestehende anzeigen</p>
        </Link>

        <Link href="/analytics" className="flex flex-col items-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
            <BarChart3 className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-purple-700">Analytik</h3>
          <p className="text-sm text-purple-600 text-center mt-2">Insights und Analysen anzeigen</p>
        </Link>
      </div>

      {/* Enhanced Calendar */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calendar className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Ihre nächsten Termine</h2>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' }).format(currentDate)}
          </div>
        </div>
        
        <div className="space-y-4">
          {appointments.map((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return (
              <div 
                key={appointment.id} 
                className="flex p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg flex flex-col items-center justify-center mr-4 shadow-sm">
                  <span className="text-sm font-bold text-gray-900">
                    {appointmentDate.getDate()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Intl.DateTimeFormat('de-DE', { month: 'short' }).format(appointmentDate)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock size={14} className="mr-1" />
                    <span>{formatTime(appointment.date)} ({appointment.duration} Min.)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="mr-2">{appointment.location}</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {appointment.type}
                    </span>
                  </div>
                </div>
                <Link 
                  href="#" 
                  className="flex-shrink-0 self-center px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-md"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            href="/calendar" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Alle Termine anzeigen
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Recent Events */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Clock className="text-amber-600 mr-2" size={24} />
          <h2 className="text-xl font-semibold">Letzte Ereignisse</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentEvents.map((event) => (
            <div key={event.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {event.type === 'Kundengespräch' ? (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="text-blue-600" size={20} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Users className="text-amber-600" size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900">{event.title}</h3>
                    <span className="text-sm text-gray-500">{formatShortDate(event.date)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{event.summary}</p>
                  {event.products && event.products.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {event.products.map((product, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {event.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="flex-shrink-0 self-start px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-md"
                >
                  Öffnen
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            href="/history" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Alle Ereignisse anzeigen
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 