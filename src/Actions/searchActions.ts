import { SEARCH_ROUTE } from "../routes"

export async function searchUsers (search:string) {
  if(!search || search === '') return

  try {
    const res = await fetch(SEARCH_ROUTE + search, {
      method:'GET',
      credentials:'include'
    })

    const data = await res.json()

    if(!res.ok) {
      return data.users
    }

    return data.users
  } catch (e) {
    console.log(e)
  }
}