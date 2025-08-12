import React, { useState, useEffect } from 'react';
import { useOperations } from '../../context/OperationContext';
import { Operation } from '../../types';
import { mockDoctors, mockOperationRooms } from '../../data/mockData';
import { X, AlertCircle, CheckCircle, User, Calendar, Clock, Stethoscope, Bed, Heart, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import './OperationForm.css';

interface OperationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OperationForm({ isOpen, onClose }: OperationFormProps) {
  const { state, dispatch } = useOperations();
  const [formData, setFormData] = useState<Partial<Operation>>({
    patientName: '',
    patientAge: 0,
    doctorName: '',
    operationType: '',
    operationRoom: '',
    scheduledDate: new Date(),
    scheduledTime: '',
    duration: 1,
    status: 'Scheduled',
    priority: 'Medium',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (state.selectedOperation) {
      setFormData(state.selectedOperation);
    } else {
      setFormData({
        patientName: '',
        patientAge: 0,
        doctorName: '',
        operationType: '',
        operationRoom: '',
        scheduledDate: new Date(),
        scheduledTime: '',
        duration: 1,
        status: 'Scheduled',
        priority: 'Medium',
        notes: ''
      });
    }
    setErrors({});
  }, [state.selectedOperation]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName?.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientAge || formData.patientAge <= 0) {
      newErrors.patientAge = 'Valid patient age is required';
    }

    if (!formData.doctorName) {
      newErrors.doctorName = 'Doctor selection is required';
    }

    if (!formData.operationType) {
      newErrors.operationType = 'Operation type is required';
    }

    if (!formData.operationRoom) {
      newErrors.operationRoom = 'Operation room is required';
    }

    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
    }

    if (!formData.scheduledTime) {
      newErrors.scheduledTime = 'Scheduled time is required';
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Valid duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }

    setIsSubmitting(true);

    const operation: Operation = {
      ...formData as Operation,
      id: state.selectedOperation?.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setTimeout(() => {
      if (state.selectedOperation) {
        dispatch({ type: 'UPDATE_OPERATION', payload: operation });
        toast.success('Operation updated successfully!', {
          icon: <CheckCircle size={20} />
        });
      } else {
        dispatch({ type: 'ADD_OPERATION', payload: operation });
        toast.success('Operation scheduled successfully!', {
          icon: <CheckCircle size={20} />
        });
      }

      dispatch({ type: 'SELECT_OPERATION', payload: null });
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'patientAge' || name === 'duration' ?
        (value ? parseFloat(value) : 0) :
        name === 'scheduledDate' ? new Date(value) : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePrioritySelect = (priority: 'Low' | 'Medium' | 'High' | 'Emergency') => {
    setFormData(prev => ({ ...prev, priority }));

    // Clear error if it exists
    if (errors.priority) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.priority;
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fadeIn" onClick={onClose}>
      <div className="modal-content animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{state.selectedOperation ? 'Edit Operation' : 'Schedule New Operation'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="operation-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Patient Name *</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className={`form-input ${errors.patientName ? 'error' : ''}`}
                  placeholder="Enter patient name"
                />
              </div>
              {errors.patientName && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  {errors.patientName}
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Patient Age *</label>
              <div className="input-with-icon">
                <Activity size={18} className="input-icon" />
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  className={`form-input ${errors.patientAge ? 'error' : ''}`}
                  placeholder="Enter patient age"
                  min="0"
                  max="120"
                />
              </div>
              {errors.patientAge && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  {errors.patientAge}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Doctor *</label>
            <div className="input-with-icon">
              <Stethoscope size={18} className="input-icon" />
              <select
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                className={`form-select ${errors.doctorName ? 'error' : ''}`}
              >
                <option value="">Select Doctor</option>
                {mockDoctors.filter(doc => doc.available).map(doctor => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            {errors.doctorName && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.doctorName}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Operation Type *</label>
            <div className="input-with-icon">
              <Heart size={18} className="input-icon" />
              <select
                name="operationType"
                value={formData.operationType}
                onChange={handleChange}
                className={`form-select ${errors.operationType ? 'error' : ''}`}
              >
                <option value="">Select Operation Type</option>
                <option value="Cardiac Surgery">Cardiac Surgery</option>
                <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
                <option value="Emergency Surgery">Emergency Surgery</option>
              </select>
            </div>
            {errors.operationType && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.operationType}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Operation Room *</label>
            <div className="input-with-icon">
              <Bed size={18} className="input-icon" />
              <select
                name="operationRoom"
                value={formData.operationRoom}
                onChange={handleChange}
                className={`form-select ${errors.operationRoom ? 'error' : ''}`}
              >
                <option value="">Select Operation Room</option>
                {mockOperationRooms.filter(room => room.available).map(room => (
                  <option key={room.id} value={room.name}>
                    {room.name} - {room.type}
                  </option>
                ))}
              </select>
            </div>
            {errors.operationRoom && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.operationRoom}
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Scheduled Date *</label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate ? new Date(formData.scheduledDate).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  className={`form-input ${errors.scheduledDate ? 'error' : ''}`}
                />
              </div>
              {errors.scheduledDate && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  {errors.scheduledDate}
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Scheduled Time *</label>
              <div className="input-with-icon">
                <Clock size={18} className="input-icon" />
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  className={`form-input ${errors.scheduledTime ? 'error' : ''}`}
                />
              </div>
              {errors.scheduledTime && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  {errors.scheduledTime}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Duration (hours) *</label>
              <div className="input-with-icon">
                <Clock size={18} className="input-icon" />
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`form-input ${errors.duration ? 'error' : ''}`}
                  min="0.5"
                  max="12"
                  step="0.5"
                  placeholder="Enter duration"
                />
              </div>
              {errors.duration && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  {errors.duration}
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Priority *</label>
              <div className="priority-selector">
                <div
                  className={`priority-option priority-emergency-option ${formData.priority === 'Emergency' ? 'selected' : ''}`}
                  onClick={() => handlePrioritySelect('Emergency')}
                >
                  Emergency
                </div>
                <div
                  className={`priority-option priority-high-option ${formData.priority === 'High' ? 'selected' : ''}`}
                  onClick={() => handlePrioritySelect('High')}
                >
                  High
                </div>
                <div
                  className={`priority-option priority-medium-option ${formData.priority === 'Medium' ? 'selected' : ''}`}
                  onClick={() => handlePrioritySelect('Medium')}
                >
                  Medium
                </div>
                <div
                  className={`priority-option priority-low-option ${formData.priority === 'Low' ? 'selected' : ''}`}
                  onClick={() => handlePrioritySelect('Low')}
                >
                  Low
                </div>
              </div>
              {errors.priority && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  {errors.priority}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="input-with-icon">
              <Activity size={18} className="input-icon" />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-input"
              rows={3}
              placeholder="Additional notes about the operation..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : (state.selectedOperation ? 'Update Operation' : 'Schedule Operation')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
