export interface Operation {
  id: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  operationType: string;
  operationRoom: string;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // in hours
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  available: boolean;
}

export interface OperationRoom {
  id: string;
  name: string;
  type: string;
  available: boolean;
}
