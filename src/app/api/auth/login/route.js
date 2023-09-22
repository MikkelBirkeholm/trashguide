import { NextResponse } from 'next/server'

export async function POST(request) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  const requestUrl = new URL(request.url)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

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

    if (response.status == 200) {
      const result = await response.json()

      const cookieHeaders = new Headers()
      cookieHeaders.append(
        'Set-Cookie',
        `token=${result.access_token}; Path=/;`
      )
      cookieHeaders.append('Set-Cookie', `user_id=${result.user.id}; Path=/;`)

      return new NextResponse(JSON.stringify(result), {
        status: 200,
        headers: cookieHeaders,
      })
    }
    if (response.status == 401) {
      return new NextResponse(JSON.stringify(response), {
        status: response.status,
        message: 'Uautoriseret',
      })
    }
  } catch (error) {
    console.log('catched', error)
  }
}
