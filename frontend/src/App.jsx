import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className='min-h-screen bg-sky-50 text-black relative overflow-hidden'>
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
<Route path='/signup' element={<SignUpPage/>}/>
<Route path='/login' element={<LoginPage/>}/>


    </Routes>

    </div>
    </div>
  )
}

export default App
