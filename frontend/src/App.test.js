import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as apiRequests from "./apiRequests";

// Mock the API requests
jest.mock("./apiRequests", () => ({
  getAllFlights: jest.fn(),
  bookFlight: jest.fn(),
  searchFlight: jest.fn(),
}));

// Suppress alerts during testing
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {}); 
});

// Suppress console errors during testing
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// Restore original implementations after each test
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Flight Booking App", () => {
  /**
   * Test: Renders flight list
   * Description: Ensures the app fetches and displays the list of flights on initial load.
   */
  test("renders flight list", async () => {
    apiRequests.getAllFlights.mockResolvedValue({
      status: "successful",
      data: [
        {
          flight_id: 1,
          flight_number: "FL001",
          origin_airport_name: "John F. Kennedy International Airport",
          origin_city: "New York",
          origin_country: "USA",
          destination_airport_name: "Los Angeles International Airport",
          destination_city: "Los Angeles",
          destination_country: "USA",
          departure_time: "2024-12-01T10:00:00Z",
          arrival_time: "2024-12-01T13:00:00Z",
          remaining_seats: 50,
          price: 300,
        },
      ],
    });

    render(<App />);

    expect(screen.getByText(/loading flights.../i)).toBeInTheDocument();

    await waitFor(() => screen.getByText(/FL001/i));

    expect(screen.getByText("FL001")).toBeInTheDocument();
    expect(screen.getByText(/John F. Kennedy International Airport/i)).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles International Airport/i)).toBeInTheDocument();
    expect(screen.getByText(/\$300/i)).toBeInTheDocument();
  });

  /**
   * Test: Opens modal and books a flight
   * Description: Ensures the user can book a flight successfully after filling in the form.
   */
  test("opens modal and books a flight", async () => {
    apiRequests.getAllFlights.mockResolvedValue({
      status: "successful",
      data: [
        {
          flight_id: 1,
          flight_number: "FL001",
          origin_airport_name: "John F. Kennedy International Airport",
          origin_city: "New York",
          origin_country: "USA",
          destination_airport_name: "Los Angeles International Airport",
          destination_city: "Los Angeles",
          destination_country: "USA",
          departure_time: "2024-12-01T10:00:00Z",
          arrival_time: "2024-12-01T13:00:00Z",
          remaining_seats: 50,
          price: 300,
        },
      ],
    });

    apiRequests.bookFlight.mockResolvedValue({
      status: "successful",
    });

    render(<App />);

    await waitFor(() => screen.getByText(/FL001/i));

    fireEvent.click(screen.getByText(/book now/i));

    expect(screen.getByText(/booking flight/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/id/i), { target: { value: "123456789" } });

    fireEvent.click(screen.getByText(/confirm booking/i));

    expect(apiRequests.bookFlight).toHaveBeenCalledWith(1, "John Doe", "123456789");
  });

  /**
   * Test: Handles API errors gracefully
   * Description: Ensures the app handles API errors when fetching flights.
   */
  test("handles API errors gracefully", async () => {
    apiRequests.getAllFlights.mockResolvedValue({ status: "failed" });

    render(<App />);

    await waitFor(() => screen.queryByText(/loading flights.../i));

    expect(screen.queryByText(/FL001/i)).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith("Error fetching flights");
  });

  /**
   * Test: Search filters flights
   * Description: Ensures the user can search for flights based on origin and destination.
   */
  test("search filters flights", async () => {
    apiRequests.getAllFlights.mockResolvedValue({
      status: "successful",
      data: [
        {
          flight_id: 1,
          flight_number: "FL001",
          origin_airport_name: "John F. Kennedy International Airport",
          origin_city: "New York",
          origin_country: "USA",
          destination_airport_name: "Los Angeles International Airport",
          destination_city: "Los Angeles",
          destination_country: "USA",
          departure_time: "2024-12-01T10:00:00Z",
          arrival_time: "2024-12-01T13:00:00Z",
          remaining_seats: 50,
          price: 300,
        },
        {
          flight_id: 2,
          flight_number: "FL002",
          origin_airport_name: "San Francisco International Airport",
          origin_city: "San Francisco",
          origin_country: "USA",
          destination_airport_name: "Chicago O'Hare International Airport",
          destination_city: "Chicago",
          destination_country: "USA",
          departure_time: "2024-12-02T14:00:00Z",
          arrival_time: "2024-12-02T18:00:00Z",
          remaining_seats: 40,
          price: 250,
        },
      ],
    });

    apiRequests.searchFlight.mockResolvedValue({
      status: "successful",
      data: [
        {
          flight_id: 1,
          flight_number: "FL001",
          origin_airport_name: "John F. Kennedy International Airport",
          origin_city: "New York",
          origin_country: "USA",
          destination_airport_name: "Los Angeles International Airport",
          destination_city: "Los Angeles",
          destination_country: "USA",
          departure_time: "2024-12-01T10:00:00Z",
          arrival_time: "2024-12-01T13:00:00Z",
          remaining_seats: 50,
          price: 300,
        },
      ],
    });

    render(<App />);

    await waitFor(() => screen.getByText(/FL001/i));

    fireEvent.change(screen.getByPlaceholderText(/origin/i), { target: { value: "New York" } });
    fireEvent.change(screen.getByPlaceholderText(/destination/i), { target: { value: "Los Angeles" } });

    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => screen.getByText(/FL001/i));

    expect(screen.getByText(/FL001/i)).toBeInTheDocument();
    expect(screen.queryByText(/FL002/i)).not.toBeInTheDocument();
  });
});
