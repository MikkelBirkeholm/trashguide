export default async function useLogin(username, password) {
  const apiUrl = process.env.API_URL || 'http://localhost:4000' // Use environment variables for the API URL

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')

  const body = new URLSearchParams()

  // edit default values til at bruge props
  body.append('username', username)
  body.append('password', password)

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${apiUrl}/login`, requestOptions)

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }
    const result = await response.json()
    sessionStorage.setItem('token', result.access_token)
    sessionStorage.setItem('user_id', result.user_id)
    return result
  } catch (error) {
    console.error('Error:', error)
    return error.message
  }
}
