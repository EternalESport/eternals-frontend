const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const getEvents = async () => {
  const response = await fetch(`${apiBaseUrl}/api/events`)

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'Unable to load events.'
    )
  }

  return Array.isArray(data) ? data : []
}