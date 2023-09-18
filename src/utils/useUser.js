export default function useUser() {
  const checkUser = async () => {
    if (typeof sessionStorage != 'undefined') {
      const user = {
        token: sessionStorage.getItem('token'),
        id: sessionStorage.getItem('user_id'),
        username: sessionStorage.getItem('username'),
      }
      if (user.token) return user
    }
  }

  const logUserIn = async (username, password) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'post',
      body: formData,
    })
    const { status } = res
    const { token, user_id } = await res.json()

    if (status == 200) {
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user_id', user_id)
      sessionStorage.setItem('username', username)
    }
    return true
  }

  const logUserOut = async () => {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user_id')
      sessionStorage.removeItem('username')
      await fetch('/api/auth/logout')
      return true
    } else {
      console.log('sessionstorage not available or user is already logged out')
    }
  }
  return [checkUser, logUserOut, logUserIn]
}
