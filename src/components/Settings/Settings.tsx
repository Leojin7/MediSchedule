import React, { useState } from 'react';
import {
  Bell,
  Shield,
  Palette,
  Monitor,
  Database,
  User,
  Lock,
  Mail,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false
    },
    appearance: {
      theme: 'light',
      language: 'en'
    },
    security: {
      twoFactor: false,
      password: ''
    }
  });

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        privacy: {
          profileVisibility: 'private',
          dataSharing: false
        },
        appearance: {
          theme: 'light',
          language: 'en'
        },
        security: {
          twoFactor: false,
          password: ''
        }
      });
    }
  };

  return (
    <div className="settings-container">
      <div className="page-header animate-fadeIn">
        <h1>⚙️ Settings</h1>
        <p>Manage your application preferences</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card animate-slideIn">
          <div className="settings-header">
            <Bell size={24} />
            <h3>Notifications</h3>
          </div>

          <div className="settings-group">
            <div className="setting-item">
              <label>Email Notifications</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      email: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </div>
            </div>

            <div className="setting-item">
              <label>Push Notifications</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      push: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </div>
            </div>

            <div className="setting-item">
              <label>SMS Notifications</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      sms: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card animate-slideIn">
          <div className="settings-header">
            <Shield size={24} />
            <h3>Privacy</h3>
          </div>

          <div className="settings-group">
            <div className="setting-item">
              <label>Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    profileVisibility: e.target.value
                  }
                })}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Data Sharing</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.dataSharing}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      dataSharing: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card animate-slideIn">
          <div className="settings-header">
            <Palette size={24} />
            <h3>Appearance</h3>
          </div>

          <div className="settings-group">
            <div className="setting-item">
              <label>Theme</label>
              <div className="theme-options">
                <button
                  className={`theme-option ${settings.appearance.theme === 'light' ? 'selected' : ''}`}
                  onClick={() => setSettings({
                    ...settings,
                    appearance: {
                      ...settings.appearance,
                      theme: 'light'
                    }
                  })}
                >
                  <Monitor size={16} />
                  Light
                </button>
                <button
                  className={`theme-option ${settings.appearance.theme === 'dark' ? 'selected' : ''}`}
                  onClick={() => setSettings({
                    ...settings,
                    appearance: {
                      ...settings.appearance,
                      theme: 'dark'
                    }
                  })}
                >
                  <Monitor size={16} />
                  Dark
                </button>
              </div>
            </div>

            <div className="setting-item">
              <label>Language</label>
              <select
                value={settings.appearance.language}
                onChange={(e) => setSettings({
                  ...settings,
                  appearance: {
                    ...settings.appearance,
                    language: e.target.value
                  }
                })}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-card animate-slideIn">
          <div className="settings-header">
            <Lock size={24} />
            <h3>Security</h3>
          </div>

          <div className="settings-group">
            <div className="setting-item">
              <label>Two-Factor Authentication</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      twoFactor: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </div>
            </div>

            <div className="setting-item">
              <label>Change Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={settings.security.password}
                onChange={(e) => setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    password: e.target.value
                  }
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={handleReset}>
          <RefreshCw size={16} />
          Reset to Default
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;