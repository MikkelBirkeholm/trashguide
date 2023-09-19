import { NextResponse } from 'next/server'
import { Logger } from 'sass'

// export const revalidate = 0

export async function POST(request) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  const requestUrl = new URL(request.url)

  const apiUrl = process.env.API_URL || 'http://localhost:3000'

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
      cookieHeaders.append(
        'Set-Cookie',
        `user_firstname=${result.user.firstname}; Path=/;`
      )
      cookieHeaders.append(
        'Set-Cookie',
        `user_lastname=${result.user.lastname}; Path=/;`
      )

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

  // console.log('server side', response)
  // const result = response

  // Expire time sættes på cookie, hvis den ikke skal være session based
  // const expireTime = new Date() + 60 * 60 * 24

  //   return new NextResponse(
  //     JSON.stringify({
  //       token: result.access_token,
  //       user_id: result.user.id,
  //       username: username,
  //     }),
  //     {
  //       status: 200,
  //       headers: {
  //         'Set-Cookie': `token=${result.access_token}; Path=/;`,
  //       },
  //     }
  //   )

  // return new Response('Cool')
}
