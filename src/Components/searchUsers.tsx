import type React from "react"
import { useState } from "react";
import { toast } from "sonner";
import { searchUsers } from "../Actions/searchActions";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../Actions/authActions";
import { useSelector } from "react-redux"
import type { RootState } from "../Store/store";

export interface Result {
  img:string,
  id:string,
  username:string,
  name:string,
  lastname:string
}

export function SearchUsers () {
  const [result, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { user } = useSelector((state:RootState) => state.loginSlice)
  const navigate = useNavigate()
  const handleSearch = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const form = e.currentTarget;

    const formdata = new FormData(form)
    const search = formdata.get('search') as string

    if(!search || search.trim() === '') {
      setResults([])
      return setLoading(false)
    } 

    toast.success(`searching ${search}...`)

    searchUsers(search.trim())
      .then(res => {
        setResults(res)
        setLoading(false)
        localStorage.setItem('search', search)
      })
      .catch(() => {
        setResults([])
        setLoading(false)
      })
  } 

  const filtered = result.filter(res => res.id !== user?.id)
  const redirectToForeign = async (post_user:string) => {
    if(post_user === user?.id) return
    await getUserById({creator:post_user})
    navigate('/dashboard/visitProfile')
  }

  return (
    <div className="search-screen">
      <form id="form" className="form-search" onSubmit={handleSearch}>
        <input name="search" type="text" placeholder="username" className="search-input" />
        <button>Search</button>
      </form>
      <div className="search-results">
        <ul>
          {filtered.length === 0 && <h2>No results found</h2>}
          {loading && <h2>loading...</h2>}
          { filtered.length !== 0 && (
            filtered.map(res => {
              return (
                <li onClick={() => redirectToForeign(res.id)} key={res.id} className="search-result-item">
                  <img src={res.img} alt="" className="result-img" />
                  <div className="identifiers">
                    <div className="name-lastname">
                      <strong>{res.name} {res.lastname}</strong>
                    </div>
                    <p>@{res.username}</p>
                  </div>
                </li>
              )
            })
          )
          }
        </ul>
      </div>
    </div>
  )
}