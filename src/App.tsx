import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { WelcomePage } from './Components/WelcomePage.tsx'
import { LoginForm } from './Components/LoginForm.tsx'
import { Protected } from './Components/Protected.tsx'
import { Dashboard } from './Components/Dashboard.tsx'
import { RegisterForm } from './Components/RegisterForm.tsx'
import { NotFound } from './Components/NotFound.tsx'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <WelcomePage /> } />
          <Route path='/login' element={ <LoginForm /> } />
          <Route path='/register' element={ <RegisterForm /> } />
          <Route path='/dashboard/*' element={
            <Protected>
              <Dashboard />
            </Protected>
          } />
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
