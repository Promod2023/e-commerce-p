import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    
    <div className='navbar'>
        <img src={navlogo} alt="navlogo" />
        <div><img src={navProfile} className='navprofile' alt="navprofile" />Shopper</div>
    </div>
  )
}

export default Navbar