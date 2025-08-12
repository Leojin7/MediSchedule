import React, { useState } from 'react';
import { useOperations } from '../../context/OperationContext';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, Stethoscope } from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
  const { state } = useOperations();
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getOperationsForDate = (date: Date) => {
    return state.operations.filter(op =>
      isSameDay(new Date(op.scheduledDate), date)
    );
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button className="nav-button" onClick={prevMonth}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="current-month">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button className="nav-button" onClick={nextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day-header" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="calendar-days">{days}</div>;
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let row = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const clone = new Date(d);
      const operations = getOperationsForDate(clone);

      row.push(
        <div
          className={`calendar-cell ${!isSameMonth(clone, monthStart) ? 'disabled' : ''
            } ${isSameDay(clone, new Date()) ? 'today' : ''}`}
          key={clone.toString()}
        >
          <span className="cell-date">{format(clone, 'd')}</span>
          <div className="cell-operations">
            {operations.slice(0, 3).map(op => (
              <div
                key={op.id}
                className={`operation-indicator priority-${op.priority.toLowerCase()}`}
                title={`${op.patientName} - ${op.scheduledTime}`}
              >
                <Clock size={12} />
              </div>
            ))}
            {operations.length > 3 && (
              <div className="more-indicator">+{operations.length - 3}</div>
            )}
          </div>
        </div>
      );

      if (row.length === 7) {
        rows.push(
          <div className="calendar-row" key={clone.toString()}>
            {row}
          </div>
        );
        row = [];
      }
    }

    return <div className="calendar-cells">{rows}</div>;
  };

  return (
    <div className="calendar-container">
      <div className="calendar animate-fadeIn">
        {renderHeader()}
        <div className="calendar-grid">
          <div className="calendar-day-header">Sun</div>
          <div className="calendar-day-header">Mon</div>
          <div className="calendar-day-header">Tue</div>
          <div className="calendar-day-header">Wed</div>
          <div className="calendar-day-header">Thu</div>
          <div className="calendar-day-header">Fri</div>
          <div className="calendar-day-header">Sat</div>
          {renderCells()}
        </div>
      </div>

      <div className="calendar-legend">
        <h3>Priority Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color emergency"></div>
            <span>Emergency</span>
          </div>
          <div className="legend-item">
            <div className="legend-color high"></div>
            <span>High</span>
          </div>
          <div className="legend-item">
            <div className="legend-color medium"></div>
            <span>Medium</span>
          </div>
          <div className="legend-item">
            <div className="legend-color low"></div>
            <span>Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;