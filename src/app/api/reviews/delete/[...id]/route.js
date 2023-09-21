import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request, { params }) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const user_id = cookieStore.get('user_id')
  const review_id = params.id[0]
  const request_id = params.id[1]

  if (request_id == user_id.value) {
    try {
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token.value}`)

      var requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow',
      }
      const res = await fetch(
        `http://localhost:4000/reviews/${review_id}`,
        requestOptions
      )

      if (res.status == 200) {
        const result = await res.json()
        return new NextResponse(JSON.stringify(result), {
          status: 200,
        })
      }
    } catch (error) {
      console.log(error)
      return new NextResponse(JSON.stringify('Der skete muligvis en fejl'))
    }
  }

  // http://localhost:4000/reviews/{{review_id}}
}
