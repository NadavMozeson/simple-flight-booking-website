import { useState, useEffect } from "react";
import "./App.css";
import { getAllFlights, bookFlight, searchFlight } from "./apiRequests";

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [formData, setFormData] = useState({ name: "", id: "" });
  const [searchCriteria, setSearchCriteria] = useState({ origin: "", destination: "" });

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchFlight(searchCriteria.origin, searchCriteria.destination);
      if (data.status === "successful") {
        setFlights(data.data);
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookFlight = async () => {
    if (selectedFlight && formData.name && formData.id) {
      const bookResult = await bookFlight(selectedFlight.flight_id, formData.name, formData.id);
      if (bookResult.status === "successful") {
        alert("Flight booked successfully!");
        fetchData();
      } else {
        alert("Error booking flight.");
      }
      setModalVisible(false);
      setFormData({ name: "", id: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight List</h1>
        <div className="search-container">
          <input
            type="text"
            name="origin"
            value={searchCriteria.origin}
            onChange={handleSearchChange}
            placeholder="Origin"
          />
          <input
            type="text"
            name="destination"
            value={searchCriteria.destination}
            onChange={handleSearchChange}
            placeholder="Destination"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading ? (
          <p>Loading flights...</p>
        ) : (
          <div className="flights-container">
            {flights.map((flight) => (
              <div className="flight-box" key={flight.flight_id}>
                <h2>{flight.flight_number}</h2>
                <p>
                  <strong>Origin:</strong> {flight.origin_airport_name} ({flight.origin_city},{" "}
                  {flight.origin_country})
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
                  <strong>Remaining Seats:</strong> {flight.remaining_seats}
                </p>
                <p className="price">
                  <strong>Price:</strong> ${flight.price}
                </p>
                <button
                  className="btn-book"
                  onClick={() => {
                    setSelectedFlight(flight);
                    setModalVisible(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </header>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Book Flight</h2>
            <p>
              Booking flight: <strong>{selectedFlight.flight_number}</strong>
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Enter your ID"
                />
              </div>
              <button type="button" className="btn-submit" onClick={handleBookFlight}>
                Confirm Booking
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
