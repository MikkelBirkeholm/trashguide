import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  cookies().delete('token')
  cookies().delete('user_id')
  redirect('/')
}
