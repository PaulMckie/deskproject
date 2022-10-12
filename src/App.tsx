import React from 'react';
import './App.css';
import { DeskRow } from './DeskRow';
import { utils } from './utils';


//utils - generates 5 rows
export function App(): any {
  const userID = 'User';

  return (
    <div className="App">
      <p>DEMO Desk Booking System</p>
      {utils.range(0, 4).map(rowNumber => (
        < DeskRow
          key={rowNumber}
          row={rowNumber}
        />
      ))}
    </div>
  );
}
