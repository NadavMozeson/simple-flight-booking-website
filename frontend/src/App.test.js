import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as apiRequests from "./apiRequests";

jest.mock("./apiRequests", () => ({
  getAllFlights: jest.fn(),
  bookFlight: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {}); 
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Flight Booking App", () => {
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

  test("handles API errors gracefully", async () => {
    apiRequests.getAllFlights.mockResolvedValue({ status: "failed" });

    render(<App />);

    await waitFor(() => screen.queryByText(/loading flights.../i));

    expect(screen.queryByText(/FL001/i)).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith("Error fetching flights");
  });
});
