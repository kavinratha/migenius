'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, FolderClosed, FolderOpen, BarChart3, Plus, Settings } from 'lucide-react';
import { useSidebar } from './SidebarProvider';

interface SidebarItemProps {
  item: {
    id: string;
    title: string;
    type: 'folder' | 'file';
    color?: string;
    children?: Array<{
      id: string;
      title: string;
      type: 'folder' | 'file';
      route?: string;
    }>;
    route?: string;
  };
  level?: number;
}

function SidebarItem({ item, level = 0 }: SidebarItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const isActive = item.route === pathname;

  const getIcon = () => {
    if (item.type === 'folder') {
      if (item.id === 'analytics') return <BarChart3 size={18} className={item.color ? `text-${item.color}-600` : ''} />;
      return isOpen ? 
        <FolderOpen size={18} className={item.color ? `text-${item.color}-600` : ''} /> : 
        <FolderClosed size={18} className={item.color ? `text-${item.color}-600` : ''} />;
    }
    return <FileText size={18} className={item.color ? `text-${item.color}-600` : ''} />;
  };

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const baseClasses = 'flex items-center px-3 py-2 text-sm rounded-md cursor-pointer';
  const hoverClasses = item.color ? 
    `hover:bg-${item.color}-50 dark:hover:bg-${item.color}-900/20` : 
    'hover:bg-gray-100 dark:hover:bg-gray-800';
  const activeClasses = isActive ? 
    (item.color ? `bg-${item.color}-50 dark:bg-${item.color}-900/20` : 'bg-gray-100 dark:bg-gray-800') : 
    '';
  const textClasses = item.type === 'folder' && item.color ? `text-${item.color}-700 dark:text-${item.color}-400` : '';
  const levelClasses = level > 0 ? 'ml-6' : '';

  return (
    <div>
      {item.route ? (
        <Link href={item.route}>
          <div className={`${baseClasses} ${hoverClasses} ${activeClasses} ${textClasses} ${levelClasses}`}>
            <span className="mr-2">{getIcon()}</span>
            <span className="flex-1">{item.title}</span>
            {item.type === 'folder' && (
              <ChevronRight
                size={16}
                className={`transform transition-transform ${isOpen ? 'rotate-90' : ''} ${item.color ? `text-${item.color}-600` : ''}`}
              />
            )}
          </div>
        </Link>
      ) : (
        <div
          className={`${baseClasses} ${hoverClasses} ${textClasses} ${levelClasses}`}
          onClick={handleClick}
        >
          <span className="mr-2">{getIcon()}</span>
          <span className="flex-1">{item.title}</span>
          {item.type === 'folder' && (
            <ChevronRight
              size={16}
              className={`transform transition-transform ${isOpen ? 'rotate-90' : ''} ${item.color ? `text-${item.color}-600` : ''}`}
            />
          )}
        </div>
      )}
      {item.type === 'folder' && isOpen && item.children && (
        <div className="mt-1">
          {item.children.map((child) => (
            <SidebarItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { sidebarItems } = useSidebar();

  return (
    <div className="flex flex-col h-full">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-3">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      {/* Bottom buttons */}
      <div className="p-3 space-y-2 border-t border-gray-200 dark:border-gray-700">
        {/* New Transcription Button */}
        <Link href="/">
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus size={18} className="mr-2" />
            Neue Transkription
          </button>
        </Link>
        
        {/* Settings Button */}
        <Link href="/settings">
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings size={18} className="mr-2" />
            Einstellungen
          </button>
        </Link>
      </div>
    </div>
  );
} 