import React, { useState } from 'react'

function SearchBar({ handlePostSearch, handleSearchToggle }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <div className="search-container">
        <input
          className={`search-bar`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search title / Author / Tags"
        />
        <button className="search-btn" onClick={() => handlePostSearch(searchQuery)}>
          <i className="gg-search"></i>
        </button>
      </div>
      <button onClick={handleSearchToggle}>
        <i className="gg-close"></i>
      </button>
    </>
  )
}

export default SearchBar
