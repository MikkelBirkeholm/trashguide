import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// export const revalidate = 0

// var myHeaders = new Headers()
// myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
// myHeaders.append(
//   'Authorization',
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUxMjA1ODEsImRhdGEiOnsiaWQiOjEsImZpcnN0bmFtZSI6IktsYXVzIiwibGFzdG5hbWUiOiJCdW5kZ2FhcmQiLCJlbWFpbCI6ImluZm9Ad2VidWR2aWtsZXIuZGsifSwiaWF0IjoxNjk1MTE2OTgxfQ.0aF0pe-qNnjd9Toqm0d3pCVoQ6toxt-Eq9ZyGp3rizQ'
// )
export async function POST(request) {
  const formData = await request.formData()
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  const requestUrl = new URL(request.url)

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
