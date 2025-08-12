import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Operation } from '../types';
import { mockOperations } from '../data/mockData';

interface OperationState {
  operations: Operation[];
  selectedOperation: Operation | null;
  isModalOpen: boolean;
}

type OperationAction =
  | { type: 'ADD_OPERATION'; payload: Operation }
  | { type: 'UPDATE_OPERATION'; payload: Operation }
  | { type: 'DELETE_OPERATION'; payload: string }
  | { type: 'SELECT_OPERATION'; payload: Operation | null }
  | { type: 'TOGGLE_MODAL' };

const initialState: OperationState = {
  operations: mockOperations,
  selectedOperation: null,
  isModalOpen: false
};

const OperationContext = createContext<{
  state: OperationState;
  dispatch: React.Dispatch<OperationAction>;
} | undefined>(undefined);

function operationReducer(state: OperationState, action: OperationAction): OperationState {
  switch (action.type) {
    case 'ADD_OPERATION':
      return {
        ...state,
        operations: [...state.operations, action.payload]
      };
    case 'UPDATE_OPERATION':
      return {
        ...state,
        operations: state.operations.map(op =>
          op.id === action.payload.id ? action.payload : op
        )
      };
    case 'DELETE_OPERATION':
      return {
        ...state,
        operations: state.operations.filter(op => op.id !== action.payload)
      };
    case 'SELECT_OPERATION':
      return {
        ...state,
        selectedOperation: action.payload
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    default:
      return state;
  }
}

export function OperationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(operationReducer, initialState);

  return (
    <OperationContext.Provider value={{ state, dispatch }}>
      {children}
    </OperationContext.Provider>
  );
}

export function useOperations() {
  const context = useContext(OperationContext);
  if (context === undefined) {
    throw new Error('useOperations must be used within an OperationProvider');
  }
  return context;
}
