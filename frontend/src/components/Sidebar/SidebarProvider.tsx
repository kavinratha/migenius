'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  id: string;
  title: string;
  type: 'folder' | 'file';
  children?: SidebarItem[];
  route?: string;
  color?: string;
}

interface CurrentMeeting {
  id: string;
  title: string;
}

interface SidebarContextType {
  currentMeeting: CurrentMeeting | null;
  setCurrentMeeting: (meeting: CurrentMeeting | null) => void;
  sidebarItems: SidebarItem[];
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [currentMeeting, setCurrentMeeting] = useState<CurrentMeeting | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const baseItems: SidebarItem[] = [
    {
      id: 'start',
      title: 'Start',
      type: 'file' as const,
      color: 'amber',
      route: '/start'
    },
    {
      id: 'meetings',
      title: 'Gespräche',
      type: 'folder' as const,
      color: 'blue',
      children: [
        { 
          id: 'hypothek-beratung-26-mar', 
          title: 'Gespräch - Hypothekenberatung 26. März', 
          type: 'file' as const,
          route: '/meetings/hypothek-beratung-26-mar'
        },
        { 
          id: 'anlageberatung-25-mar', 
          title: 'Gespräch - Anlageberatung 25. März', 
          type: 'file' as const,
          route: '/meetings/anlageberatung-25-mar'
        },
      ]
    },
    {
      id: 'notes',
      title: 'Notizen',
      type: 'folder' as const,
      color: 'emerald',
      children: [
        { 
          id: 'townhall-q1', 
          title: 'Townhall Meeting Q1', 
          type: 'file' as const,
          route: '/notes/townhall-q1'
        },
        { 
          id: 'jahresgespraech-2024', 
          title: 'Internes Jahresgespräch 2024', 
          type: 'file' as const,
          route: '/notes/jahresgespraech-2024'
        },
      ]
    },
    {
      id: 'analytics',
      title: 'Analytik',
      type: 'folder',
      color: 'purple',
      children: [
        { 
          id: 'overview',
          title: 'Übersicht',
          type: 'file',
          route: '/analytics'
        },
        { 
          id: 'meetings-analytics',
          title: 'Gesprächsanalyse',
          type: 'file',
          route: '/analytics/meetings'
        },
        { 
          id: 'products-analytics',
          title: 'Produktanalyse',
          type: 'file',
          route: '/analytics/products'
        },
        { 
          id: 'topics-analytics',
          title: 'Themenanalyse',
          type: 'file',
          route: '/analytics/topics'
        }
      ]
    }
  ];

  const sidebarItems: SidebarItem[] = baseItems.map(item => {
    if (item.id === 'meetings' && currentMeeting) {
      const newItem: SidebarItem = {
        ...item,
        children: [
          { id: currentMeeting.id, title: currentMeeting.title, type: 'file' as const },
          ...(item.children || []).filter(child => child.id !== currentMeeting.id)
        ]
      };
      return newItem;
    }
    return item;
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ currentMeeting, setCurrentMeeting, sidebarItems, isCollapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
}
