import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'

import { UserContext } from '../../store/userContext'
import { useLogout } from '../../helpers/authToken'
import { navLinks } from '../../constants'
import { generateInitials } from '../../helpers/helpers'

import './../assets/icons/css.gg.css'
import SearchBar from './searchBar'

function Nav() {
  const { user, dispatch } = useContext(UserContext)
  const history = useHistory()
  const logout = useLogout()

  const [showMenu, setshowMenu] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const { isAuthenticated } = user
  const first_name = user.user ? user.user.first_name : null
  const last_name = user.user ? user.user.last_name : null
  const userInitials = generateInitials(first_name, last_name)

  // handle State changes
  const handleLogout = async () => {
    await dispatch({ type: 'LOGOUT' })
    await logout()
    history.push('/login')
  }

  const handleSearchToggle = () => {
    setIsSearching(!isSearching)
  }

  const handlePostSearch = (searchQuery) => {
    history.push('/blog/page=1', {
      searchQuery: searchQuery,
    })
  }

  // Nav Components

  const avatarBtn = (
    <div className="nav-avatar">
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{userInitials}</Avatar>
    </div>
  )

  const navButtons = (
    <>
      <ul>
        <button onClick={handleSearchToggle}>
          <i className="gg-search"></i>
        </button>
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
      {isAuthenticated && avatarBtn}
    </>
  )

  const searchBar = (
    <SearchBar handlePostSearch={handlePostSearch} handleSearchToggle={handleSearchToggle} />
  )

  return (
    <div className="navbar">
      <div className="nav-brand">
        <img
          src="https://www.iconfinder.com/data/icons/social-media-black-white-1/1024/bw-4-512.png"
          alt="Blog Main Logo"
          width="40px"
        />
      </div>
      <div className="nav-content">
        <div className={`nav-content-items ${showMenu && 'active'}`}>
          {isSearching ? searchBar : navButtons}
        </div>
        <div className="toggle-btn" onClick={() => setshowMenu(!showMenu)}>
          <i className="gg-menu-right"></i>
        </div>
      </div>
    </div>
  )
}

export default Nav
