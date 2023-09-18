import { NextResponse } from 'next/server'

export async function POST(request) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const requestUrl = new URL(request.url)

  const apiUrl = process.env.API_URL || 'http://localhost:4000'

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')

  const body = new URLSearchParams()
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
    const expireTime =
      new Date(
        'Mon Sep 17 2023 13:33:25 GMT+0200 (Central European Summer Time)'
      ) +
      60 * 60 * 24

    return new NextResponse(
      JSON.stringify({
        token: result.access_token,
        user_id: result.user_id,
        username: username,
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${result.access_token}; Path=/;`,
        },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return error.message
  }
}
