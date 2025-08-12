import React from 'react';
import { mockDoctors } from '../../data/mockData';
import { User, Stethoscope, CheckCircle, XCircle } from 'lucide-react';
import './Doctors.css';

const Doctors = () => {
  return (
    <div className="doctors-container">
      <div className="page-header animate-fadeIn">
        <h1>👨‍⚕️ Doctors</h1>
        <p>View and manage hospital doctors</p>
      </div>

      <div className="doctors-grid">
        {mockDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card animate-slideIn">
            <div className="doctor-header">
              <div className="doctor-avatar">
                <User size={32} />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialization">
                  <Stethoscope size={16} />
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="doctor-details">
              <div className="availability">
                <span className={`status-indicator ${doctor.available ? 'available' : 'unavailable'}`}>
                  {doctor.available ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className="doctor-stats">
                <div className="stat-item">
                  <span className="stat-label">Experience</span>
                  <span className="stat-value">10+ years</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Operations</span>
                  <span className="stat-value">127</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.8/5</span>
                </div>
              </div>
            </div>

            <div className="doctor-actions">
              <button className="btn btn-secondary">
                View Schedule
              </button>
              <button className="btn btn-primary">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;