import React from 'react';
import { mockOperations } from '../../data/mockData';
import { Clock, User, Heart, Stethoscope } from 'lucide-react';
import './Timeline.css';

const Timeline = () => {
  // Sort operations by scheduled date and time
  const sortedOperations = [...mockOperations].sort((a, b) =>
    new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime() ||
    a.scheduledTime.localeCompare(b.scheduledTime)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return '#3b82f6';
      case 'In Progress': return '#f59e0b';
      case 'Completed': return '#10b981';
      case 'Cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Emergency': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#2563eb';
      case 'Low': return '#10b981';
      default: return '#64748b';
    }
  };

  return (
    <div className="timeline-container">
      <div className="page-header animate-fadeIn">
        <h1>🕐 Operation Timeline</h1>
        <p>Visualize upcoming and past operations</p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline">
          {sortedOperations.map((operation, index) => (
            <div key={operation.id} className="timeline-item animate-slideIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="timeline-marker">
                <div
                  className="timeline-dot"
                  style={{ backgroundColor: getPriorityColor(operation.priority) }}
                ></div>
                <div className="timeline-line"></div>
              </div>

              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>{operation.patientName}</h3>
                    <span
                      className="timeline-status"
                      style={{ color: getStatusColor(operation.status) }}
                    >
                      {operation.status}
                    </span>
                  </div>

                  <div className="timeline-details">
                    <div className="detail-item">
                      <User size={16} />
                      <span>Dr. {operation.doctorName}</span>
                    </div>
                    <div className="detail-item">
                      <Heart size={16} />
                      <span>{operation.operationType}</span>
                    </div>
                    <div className="detail-item">
                      <Stethoscope size={16} />
                      <span>Room {operation.operationRoom}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{new Date(operation.scheduledDate).toLocaleDateString()} at {operation.scheduledTime}</span>
                    </div>
                  </div>

                  <div className="timeline-footer">
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: `${getPriorityColor(operation.priority)}20`,
                        color: getPriorityColor(operation.priority),
                        borderColor: `${getPriorityColor(operation.priority)}30`
                      }}
                    >
                      {operation.priority} Priority
                    </span>
                    <span className="duration">{operation.duration} hours</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;