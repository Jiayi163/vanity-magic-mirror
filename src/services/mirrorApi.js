const API_BASE = '/api'

export async function fetchMirrorState() {
  const response = await fetch(`${API_BASE}/state`)
  if (!response.ok) {
    throw new Error('Failed to fetch mirror state')
  }
  return response.json()
}

export async function fetchPairingCode() {
  const response = await fetch(`${API_BASE}/pairing`)
  if (!response.ok) {
    throw new Error('Failed to fetch pairing code')
  }
  return response.json()
}

export async function updateMirrorState(partial, pairingCode) {
  const response = await fetch(`${API_BASE}/state`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pairingCode}`,
    },
    body: JSON.stringify(partial),
  })

  if (!response.ok) {
    throw new Error('Failed to update mirror state')
  }

  return response.json()
}
