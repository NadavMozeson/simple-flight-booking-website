const API_BASE_URL = `http://localhost:3001`

/**
 * Fetches all available flights.
 * @returns {Promise<Object>} A promise resolving to the JSON response containing all flight data.
 */
export async function getAllFlights() {
    const url = `${API_BASE_URL}/flights/get/all`
    const response = await fetch(url, {
        method: 'GET',
    })
    return await response.json()
}

/**
 * Books a flight for a user.
 * @param {number} flight - The ID of the flight to book.
 * @param {string} name - The full name of the passenger.
 * @param {string} id - The personal ID of the passenger.
 * @returns {Promise<Object>} A promise resolving to the JSON response indicating booking success or failure.
 */
export async function bookFlight(flight, name, id) {
    const url = `${API_BASE_URL}/flights/book`
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flight: flight,
          fullName: name,
          tz: id,
        }),
    });
    return await response.json()
}

/**
 * Searches for flights based on origin and destination.
 * @param {string|null} origin - The origin city to filter flights (optional).
 * @param {string|null} destination - The destination city to filter flights (optional).
 * @returns {Promise<Object>} A promise resolving to the JSON response containing matching flight data.
 */
export async function searchFlight(origin = null, destination = null) {
    const url = `${API_BASE_URL}/flights/search`
    let tempBody = {}
    if (origin) {
        tempBody.origin = origin
    }
    if (destination) {
        tempBody.destination = destination
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempBody),
    });
    return await response.json()
}