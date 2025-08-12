import React, { useState, useEffect } from 'react';
import { OperationProvider } from './context/OperationContext';
import Dashboard from './components/Dashboard/Dashboard';
import OperationForm from './components/OperationForm/OperationForm';
import Calendar from './components/Calendar/Calendar';
import Doctors from './components/Doctors/Doctors';
import Patients from './components/Patients/Patients';
import Settings from './components/Settings/Settings';
import Notifications from './components/Notifications/Notifications';
import EmergencyAlert from './components/EmergencyAlert/EmergencyAlert';
import Timeline from './components/Timeline/Timeline';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import Sidebar from './components/Common/Sidebar';
import { Toaster } from 'react-hot-toast';
import './styles/globals.css';
import './styles/animation.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);

  const handleNewOperation = () => {
    setIsModalOpen(true);
  };

  const dismissEmergencyAlert = () => {
    setShowEmergencyAlert(false);
  };

  return (
    <OperationProvider>
      <div className="app-container">
        {showEmergencyAlert && (
          <EmergencyAlert
            message="Emergency cardiac surgery required for John Smith. Patient is in critical condition."
            patientName="John Smith"
            operationType="Cardiac Surgery"
            time="ASAP"
            onDismiss={dismissEmergencyAlert}
          />
        )}

        <DarkModeToggle onToggle={(isDark) => console.log('Dark mode:', isDark)} />

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNewOperation={handleNewOperation}
        />

        <main className="main-content">
          <div className="page-header animate-fadeIn">
            <h1>🏥 Operation Scheduler</h1>
            <p>Manage and track hospital operations efficiently</p>
          </div>

          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'doctors' && <Doctors />}
          {activeTab === 'patients' && <Patients />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'timeline' && <Timeline />}

          <OperationForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </main>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#ffffff',
              fontFamily: 'var(--font-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-elevation)',
            },
          }}
        />
      </div>
    </OperationProvider>
  );
}

export default App;
