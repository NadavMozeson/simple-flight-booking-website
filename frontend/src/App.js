import { useState, useEffect } from "react";
import "./App.css";
import { getAllFlights } from "./apiRequests";

function App() {
  const [flights, setFlights] = useState([]); // State to hold flight data
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFlights();
        if (data.status === "successful") {
          setFlights(data.data);
        } else {
          console.error("Error fetching flights");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight List</h1>
        {loading ? (
          <p>Loading flights...</p>
        ) : (
          <div className="flights-container">
            {flights.map((flight) => (
              <div className="flight-box" key={flight.flight_id}>
                <h2>{flight.flight_number}</h2>
                <p>
                  <strong>Origin:</strong> {flight.origin_airport_name} (
                  {flight.origin_city}, {flight.origin_country})
                </p>
                <p>
                  <strong>Destination:</strong> {flight.destination_airport_name} (
                  {flight.destination_city}, {flight.destination_country})
                </p>
                <p>
                  <strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()}
                </p>
                <p>
                  <strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> ${flight.price}
                </p>
                <p>
                  <strong>Seats Remaining:</strong> {flight.remaining_seats}
                </p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
