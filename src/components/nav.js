import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Login',
    path: '/login',
  },
]

function Nav() {
  const [showMenu, setshowMenu] = useState(false)

  return (
    <div className="navbar">
      <div className="nav-brand">
        <img
          src="https://www.iconfinder.com/data/icons/social-media-black-white-1/1024/bw-4-512.png"
          alt=""
          width="40px"
        />
      </div>
      <div className="nav-content">
        <div className={`nav-content-items ${showMenu && 'active'}`}>
          <ul>
            {navLinks.map(({ title, path }, i) => (
              <li key={i}>
                <NavLink to={path}>{title}</NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-avatar">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
          </div>
        </div>
        <div className="toggle-btn" onClick={() => setshowMenu(!showMenu)}>
          <i className="gg-menu-right"></i>
        </div>
      </div>
    </div>
  )
}

export default Nav
