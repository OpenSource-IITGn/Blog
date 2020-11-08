import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { UserContext } from '../../store/userContext'
import { navLinks } from '../../constants'

import './../../assets/icons/css.gg.css'
import SearchBar from './searchBar'
import UserDropDown from './userDropDown'

function Nav() {
  const { user } = useContext(UserContext)
  const history = useHistory()
  const { isAuthenticated } = user

  const [showMenu, setshowMenu] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchToggle = () => {
    setIsSearching(!isSearching)
  }

  const handlePostSearch = (searchQuery) => {
    history.push('/blog/page=1', {
      searchQuery: searchQuery,
    })
  }

  // Nav Components

  const avatarBtn = <UserDropDown />

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
        <li>{!isAuthenticated && <NavLink to="/login"> Login </NavLink>}</li>
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
