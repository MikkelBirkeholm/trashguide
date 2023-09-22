import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const formData = await request.formData()
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  headers.append('Authorization', `Bearer ${token.value}`)

  const body = new URLSearchParams()
  for (const pair of formData.entries()) {
    body.append(pair[0], pair[1])
  }

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${apiUrl}/reviews`, requestOptions)

    if (response.status == 200) {
      const result = await response.json()
      return new NextResponse(JSON.stringify(result), {
        status: 200,
      })
    }
  } catch (error) {
    return new NextResponse(JSON.stringify('Der skete muligvis en fejl'))
  }
}
