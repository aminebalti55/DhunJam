import Cookies from 'js-cookie'

export const setJWT = (token: string): void => {
  Cookies.set('jwt', token, { secure: true, sameSite: 'strict', expires: 1 })
}

export const getJWT = (): string | undefined => {
  return Cookies.get('jwt')
}

export const deleteJWT = (): void => {
  Cookies.remove('jwt')
}
