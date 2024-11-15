const API_BASE_URL = `http://localhost:3001`

export async function getAllFlights() {
    const url = `${API_BASE_URL}/flights/get/all`
    const response = await fetch(url, {
        method: 'GET',
    })
    return await response.json()
}