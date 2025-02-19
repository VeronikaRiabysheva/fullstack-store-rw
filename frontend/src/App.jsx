import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useUsersStore } from './stores/useUsersStore';
import LoadingSpinner from './components/LoadingSpinner';
import AdminPage from './components/AdminPage';
import CategoryPage from './pages/CategoryPage';


function App() {
  const {user, checkAuth, checkingAuth} = useUsersStore()

  useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner/>
  return (
    <div className='min-h-screen bg-linear-to-r from-zinc-700 to-zinc-800 text-white relative overflow-hidden'>
      {/* Background gradient */}
			{/* <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='' />
				</div>
			</div> */}
<div className='relative z-50 pt-20'>
<Navbar/>
          <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/secret-dashboard' element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} />
          <Route path='/category/:category' element={ <CategoryPage />} />


    </Routes>

    </div>
    <Toaster/>
    </div>
  )
}

export default App
