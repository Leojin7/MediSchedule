import React from 'react';
import { Calendar, Clock, Users, Settings, BarChart3, Plus, Home, User, Bell } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewOperation: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onNewOperation }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'patients', label: 'Patients', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🏥 MediSchedule</h2>
        <p>Hospital Management</p>
      </div>

      <button
        className="btn btn-primary new-operation-btn animate-float"
        onClick={onNewOperation}
      >
        <Plus size={20} />
        New Operation
      </button>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-content">
          <p>🏥 MediSchedule v2.0</p>
          <p className="footer-subtext">Premium Healthcare Solution</p>
        </div>
      </div>
    </div>
  );
}
