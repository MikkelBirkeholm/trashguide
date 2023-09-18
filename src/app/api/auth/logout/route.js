import { cookies } from 'next/headers'

export async function GET() {
  cookies().delete('token')
  return new Response('Token deleted', {
    status: 200,
  })
}
