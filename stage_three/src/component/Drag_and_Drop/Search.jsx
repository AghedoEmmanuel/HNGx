import  { useState } from 'react';

function Search({ setSearchQuery }) {
  const [searchQueryLocal, setSearchQueryLocal] = useState('');
  

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchQueryLocal(query);
    setSearchQuery(query)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchQueryLocal}
        onChange={handleSearchChange}
        className='border-2 border-violet-700 rounded-xl px-20 py-2 '
      />
    </div>
  );
}

export default Search;
