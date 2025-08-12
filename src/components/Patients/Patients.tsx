import React from 'react';
import { mockOperations } from '../../data/mockData';
import { User, Heart, Clock, AlertTriangle } from 'lucide-react';
import './Patients.css';

const Patients = () => {
  // Get unique patients from operations
  const patients = Array.from(
    new Map(
      mockOperations.map(op => [op.patientName, {
        name: op.patientName,
        age: op.patientAge,
        operations: mockOperations.filter(o => o.patientName === op.patientName)
      }])
    ).values()
  );

  return (
    <div className="patients-container">
      <div className="page-header animate-fadeIn">
        <h1>👤 Patients</h1>
        <p>View and manage hospital patients</p>
      </div>

      <div className="patients-grid">
        {patients.map((patient, index) => (
          <div key={patient.name} className="patient-card animate-slideIn" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="patient-header">
              <div className="patient-avatar">
                <User size={32} />
              </div>
              <div className="patient-info">
                <h3>{patient.name}</h3>
                <p className="patient-age">Age: {patient.age} years</p>
              </div>
            </div>

            <div className="patient-details">
              <div className="patient-stats">
                <div className="stat-item">
                  <Heart size={16} />
                  <span className="stat-label">Operations</span>
                  <span className="stat-value">{patient.operations.length}</span>
                </div>
                <div className="stat-item">
                  <Clock size={16} />
                  <span className="stat-label">Last Visit</span>
                  <span className="stat-value">
                    {patient.operations.length > 0
                      ? new Date(patient.operations[patient.operations.length - 1].scheduledDate).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="patient-operations">
                <h4>Recent Operations</h4>
                {patient.operations.slice(0, 3).map(op => (
                  <div key={op.id} className="operation-item">
                    <div className="operation-info">
                      <span className="operation-type">{op.operationType}</span>
                      <span className="operation-date">
                        {new Date(op.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`operation-status status-${op.status.toLowerCase().replace(' ', '-')}`}>
                      {op.status}
                    </span>
                  </div>
                ))}
                {patient.operations.length > 3 && (
                  <div className="more-operations">
                    +{patient.operations.length - 3} more operations
                  </div>
                )}
              </div>
            </div>

            <div className="patient-actions">
              <button className="btn btn-secondary">
                View Details
              </button>
              <button className="btn btn-primary">
                Schedule Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;