import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const getRandomStatus = () => {
  const Status = ['empty', 'reserved', 'full'];
  const rand = Math.random();
  if (rand < 0.6) return 'empty';     // 60% empty
  if (rand < 0.8) return 'reserved';  // 20% reserved
  return 'full';                      // 20% full
};

const BusSeatView = () => {
  const [buses, setBuses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/buses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const busesWithSeats = res.data.map((bus) => ({
          ...bus,
          seats: Array.from({ length: 23}, (_, i) => ({
            number: i + 1,
            status: getRandomStatus(),
          })),
        }));

        setBuses(busesWithSeats);
      } catch (err) {
        console.error('Failed to fetch buses:', err);
      }
    };

    fetchBuses();
  }, [token]);

  return (
    <>
      <Navbar />

    <div className="container mt-5">
      <h2 className="text-center mb-4">🚌 Bus Seat Layout</h2>

      {buses.map((bus) => (
        <div className="card mb-5 shadow" key={bus.id}>
          <div className="card-header bg-primary text-white fw-bold">
            {bus.busName} ({bus.busNumber}) - {bus.busType}
          </div>
          <div className="card-body">
            <div className="seat-grid">
              {bus.seats.map((seat, index) => {
                const isAisle = index % 4 === 2;
                return (
                  <React.Fragment key={seat.number}>
                    {isAisle && <div className="aisle" />}
                    <div className={`seat ${seat.status}`}>
                      {seat.number}
                    </div>
                  </React.Fragment>
                );
              })}

            </div>

            {/* Legend */}
            <div className="legend mt-4 text-center">
              <span className="legend-item empty">Empty</span>
              <span className="legend-item reserved">Reserved</span>
              <span className="legend-item full">Full</span>
            </div>
          </div>
        </div>
        
      ))}

      <style>{`
        .seat-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          max-width: 360px;
          margin: 0 auto;
          justify-content: center;
        }

        .seat {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #000;
          border: 2px solid #333;
        }

        .aisle {
          width: 20px;
          height: 0;
        }

        .empty {
          background-color: #a5d6a7;
          border-color: #2e7d32;
        }

        .reserved {
          background-color: #ffcc80;
          border-color: #ef6c00;
        }

        .full {
          background-color: #ef9a9a;
          border-color: #c62828;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .legend-item {
          padding: 8px 16px;
          border-radius: 5px;
          font-weight: bold;
          color: #fff;
        }

        .legend-item.empty {
          background-color: #2e7d32;
        }

        .legend-item.reserved {
          background-color: #ef6c00;
        }

        .legend-item.full {
          background-color: #c62828;
        }
      `}</style>
    </div>
    </>
  );
};

export default BusSeatView;
