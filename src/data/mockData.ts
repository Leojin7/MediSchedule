import { Operation, Doctor, OperationRoom } from '../types';

export const mockOperations: Operation[] = [
  {
    id: '1',
    patientName: 'John Smith',
    patientAge: 45,
    doctorName: 'Dr. Sarah Johnson',
    operationType: 'Cardiac Surgery',
    operationRoom: 'OR-1',
    scheduledDate: new Date('2025-08-13'),
    scheduledTime: '09:00',
    duration: 4,
    status: 'Scheduled',
    priority: 'High',
    notes: 'Patient has history of heart disease'
  },
  {
    id: '2',
    patientName: 'Emma Wilson',
    patientAge: 32,
    doctorName: 'Dr. Michael Brown',
    operationType: 'Orthopedic Surgery',
    operationRoom: 'OR-2',
    scheduledDate: new Date('2025-08-13'),
    scheduledTime: '14:00',
    duration: 2,
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: '3',
    patientName: 'Robert Davis',
    patientAge: 58,
    doctorName: 'Dr. Lisa Anderson',
    operationType: 'Neurosurgery',
    operationRoom: 'OR-3',
    scheduledDate: new Date('2025-08-14'),
    scheduledTime: '08:00',
    duration: 6,
    status: 'Scheduled',
    priority: 'Emergency',
  }
];

export const mockDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', available: true },
  { id: '2', name: 'Dr. Michael Brown', specialization: 'Orthopedics', available: true },
  { id: '3', name: 'Dr. Lisa Anderson', specialization: 'Neurosurgery', available: false },
  { id: '4', name: 'Dr. James Wilson', specialization: 'General Surgery', available: true }
];

export const mockOperationRooms: OperationRoom[] = [
  { id: '1', name: 'OR-1', type: 'Cardiac', available: true },
  { id: '2', name: 'OR-2', type: 'Orthopedic', available: false },
  { id: '3', name: 'OR-3', type: 'Neuro', available: true },
  { id: '4', name: 'OR-4', type: 'General', available: true }
];
