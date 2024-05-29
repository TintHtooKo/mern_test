import React, { useState } from 'react'

export default function SearchBar({onSearch}) {
    let [query,setQuery] = useState('')
    const handleSearch = () =>{
        onSearch(query)
    }
  return (
    <div>
        <div className="relative mt-2 rounded-md shadow-sm">
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search"/>
            <div className="absolute inset-y-0 right-0 flex items-center">
            <button onClick={handleSearch} style={{border:'1px solid gray'}} className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                Search
            </button>
            </div>
        </div>
        </div>
  )
}
