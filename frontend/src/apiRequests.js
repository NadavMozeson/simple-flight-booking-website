const API_BASE_URL = `http://localhost:3001`

export async function getAllFlights() {
    const url = `${API_BASE_URL}/flights/get/all`
    const response = await fetch(url, {
        method: 'GET',
    })
    return await response.json()
}

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