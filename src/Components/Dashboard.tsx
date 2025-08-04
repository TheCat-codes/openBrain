import { Header } from './Header.tsx'
import { ProfileHeader } from './ProfileHeader.tsx'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './NotFound.tsx'
import { Profile } from './Profile.tsx'
import { Posts } from './Posts.tsx'
import { VisitProfile } from './VisitProfile.tsx'
import { VisitHeader } from './visitHeader.tsx'
import { SearchUsers } from './searchUsers.tsx'

export function Dashboard () {
  return (
    <>
      <div className="dashboard">
        <Routes>
          <Route index element={<Header />}/>
          <Route path="perfil" element={<ProfileHeader />}/>
          <Route path="visitProfile" element={<VisitHeader />} />
          <Route path="search" element={<VisitHeader />} />
        </Routes>
        <div className="render-zone">
          <Routes>
            <Route index element={<Posts/>} />
            <Route path="search" element={<SearchUsers/>} />
            <Route path="perfil" element={<Profile />} />
            <Route path="visitProfile" element={<VisitProfile/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  )
}