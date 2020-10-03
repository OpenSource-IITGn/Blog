import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { UserContext } from '../store/userContext'
import { useLogout } from '../helpers/authToken'

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
]

function Nav() {
  const [showMenu, setshowMenu] = useState(false)
  const { user, dispatch } = useContext(UserContext)
  const history = useHistory()
  const { isAuthenticated } = user
  const logout = useLogout()

  // TODO:fix this shitty ugly code
  let first_name = ''
  let last_name = ''
  if (user.user) {
    first_name = user.user.first_name
    last_name = user.user.last_name
  }
  // shitty code ends

  const handleLogout = async () => {
    await dispatch({ type: 'LOGOUT' })
    await logout()
    history.push('/login')
  }

  const generateInitials = () => {
    const first = first_name[0]
    let second = ''
    if (last_name) {
      second = last_name[0]
    }
    return `${first}${second}`.toUpperCase()
  }

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
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout}> Log Out</button>
              ) : (
                <NavLink to="/login"> Login </NavLink>
              )}
            </li>
          </ul>
          {isAuthenticated && (
            <div className="nav-avatar">
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {generateInitials()}
              </Avatar>
            </div>
          )}
        </div>
        <div className="toggle-btn" onClick={() => setshowMenu(!showMenu)}>
          <i className="gg-menu-right"></i>
        </div>
      </div>
    </div>
  )
}

export default Nav
