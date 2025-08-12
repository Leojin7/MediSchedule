import React from 'react';
import { AlertTriangle, X, Clock, User, Heart } from 'lucide-react';
import './EmergencyAlert.css';

interface EmergencyAlertProps {
  message: string;
  patientName: string;
  operationType: string;
  time: string;
  onDismiss: () => void;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({
  message,
  patientName,
  operationType,
  time,
  onDismiss
}) => {
  return (
    <div className="emergency-alert animate-slideInRight">
      <div className="emergency-alert-content">
        <div className="alert-header">
          <div className="alert-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="alert-title">
            <h3>EMERGENCY ALERT</h3>
            <p>Immediate Attention Required</p>
          </div>
          <button className="alert-dismiss" onClick={onDismiss}>
            <X size={20} />
          </button>
        </div>

        <div className="alert-body">
          <p className="alert-message">{message}</p>

          <div className="alert-details">
            <div className="detail-item">
              <User size={16} />
              <span>{patientName}</span>
            </div>
            <div className="detail-item">
              <Heart size={16} />
              <span>{operationType}</span>
            </div>
            <div className="detail-item">
              <Clock size={16} />
              <span>{time}</span>
            </div>
          </div>
        </div>

        <div className="alert-actions">
          <button className="btn btn-secondary" onClick={onDismiss}>
            Dismiss
          </button>
          <button className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;