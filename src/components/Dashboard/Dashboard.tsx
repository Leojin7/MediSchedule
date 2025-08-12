import React, { useEffect } from 'react';
import { useOperations } from '../../context/OperationContext';
import { Calendar, Clock, Users, AlertTriangle, Heart, Stethoscope, Bed, Activity } from 'lucide-react';
import { format } from 'date-fns';
import './Dashboard.css';

export default function Dashboard() {
  const { state } = useOperations();
  const { operations } = state;

  const todaysOperations = operations.filter(op =>
    format(new Date(op.scheduledDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const stats = {
    total: operations.length,
    today: todaysOperations.length,
    inProgress: operations.filter(op => op.status === 'In Progress').length,
    emergency: operations.filter(op => op.priority === 'Emergency').length
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Emergency': return 'emergency-card';
      case 'High': return 'high-priority-card';
      case 'Medium': return 'medium-priority-card';
      case 'Low': return 'low-priority-card';
      default: return '';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return '#3b82f6';
      case 'In Progress': return '#f59e0b';
      case 'Completed': return '#10b981';
      case 'Cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  // Add staggered animation effect
  useEffect(() => {
    const elements = document.querySelectorAll('.staggered-animation');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 100);
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card staggered-animation">
          <div className="stat-icon">
            <Calendar color="white" size={28} />
          </div>
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Operations</div>
        </div>

        <div className="stat-card staggered-animation">
          <div className="stat-icon">
            <Clock color="white" size={28} />
          </div>
          <div className="stat-number">{stats.today}</div>
          <div className="stat-label">Today's Operations</div>
        </div>

        <div className="stat-card staggered-animation">
          <div className="stat-icon">
            <Activity color="white" size={28} />
          </div>
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>

        <div className="stat-card emergency staggered-animation">
          <div className="stat-icon">
            <AlertTriangle color="white" size={28} />
          </div>
          <div className="stat-number animate-pulse">{stats.emergency}</div>
          <div className="stat-label">Emergency Cases</div>
        </div>
      </div>

      <div className="operations-grid">
        <div className="operations-section">
          <h3>Today's Operations</h3>
          <div className="operations-list">
            {todaysOperations.length === 0 ? (
              <div className="no-operations">
                <Calendar size={48} color="#94a3b8" />
                <p>No operations scheduled for today</p>
              </div>
            ) : (
              todaysOperations.map((operation, index) => (
                <div
                  key={operation.id}
                  className={`operation-card staggered-animation ${getPriorityClass(operation.priority)}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="operation-header">
                    <h4>{operation.patientName}</h4>
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: `${getPriorityColor(operation.priority)}20`,
                        color: getPriorityColor(operation.priority),
                        borderColor: `${getPriorityColor(operation.priority)}30`
                      }}
                    >
                      {operation.priority}
                    </span>
                  </div>
                  <div className="operation-details">
                    <p><Stethoscope size={16} /> <strong>Doctor:</strong> {operation.doctorName}</p>
                    <p><Heart size={16} /> <strong>Type:</strong> {operation.operationType}</p>
                    <p><Bed size={16} /> <strong>Room:</strong> {operation.operationRoom}</p>
                    <p><Clock size={16} /> <strong>Time:</strong> {operation.scheduledTime}</p>
                  </div>
                  <div className="operation-footer">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: `${getStatusColor(operation.status)}20`,
                        color: getStatusColor(operation.status),
                        borderColor: `${getStatusColor(operation.status)}30`
                      }}
                    >
                      {operation.status}
                    </span>
                    <span className="duration"><Clock size={16} /> {operation.duration}h</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="upcoming-section">
          <h3>Upcoming Operations</h3>
          <div className="operations-list">
            {operations
              .filter(op => new Date(op.scheduledDate) > new Date())
              .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
              .slice(0, 5)
              .map((operation, index) => (
                <div
                  key={operation.id}
                  className={`operation-card staggered-animation ${getPriorityClass(operation.priority)}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="operation-header">
                    <h4>{operation.patientName}</h4>
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: `${getPriorityColor(operation.priority)}20`,
                        color: getPriorityColor(operation.priority),
                        borderColor: `${getPriorityColor(operation.priority)}30`
                      }}
                    >
                      {operation.priority}
                    </span>
                  </div>
                  <div className="operation-details">
                    <p><Calendar size={16} /> <strong>Date:</strong> {format(new Date(operation.scheduledDate), 'MMM dd, yyyy')}</p>
                    <p><Stethoscope size={16} /> <strong>Doctor:</strong> {operation.doctorName}</p>
                    <p><Heart size={16} /> <strong>Type:</strong> {operation.operationType}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
