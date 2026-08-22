import axios from 'axios'
import type { Digit } from '../types/digit'

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000', timeout: 900 })

export async function generateDigit(digit: Digit) {
  try {
    return await client.post('/generate', { digit })
  } catch {
    // The browser pipeline is intentionally self-sufficient when the API is offline.
    return { data: { digit, status: 'local', message: 'Generated with the local MNIST extrusion fallback.' } }
  }
}
