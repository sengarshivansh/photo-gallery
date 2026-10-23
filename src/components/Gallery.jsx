import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { favouritesReducer, loadFavourites } from '../favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    )
  }, [photos, search])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h1>

        <input
          type="search"
          placeholder="Search by author..."
          value={search}
          onChange={handleSearch}
          aria-label="Search photos by author"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading && (
          <div className="flex justify-center py-20" role="status" aria-label="Loading">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-center text-red-600">
            Something went wrong: {error}
          </p>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="text-center text-gray-500 py-20">No photos match your search.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
