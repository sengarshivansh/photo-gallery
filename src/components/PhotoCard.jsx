export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="w-full aspect-4/3 object-cover bg-gray-200"
      />
      <div className="flex items-center justify-between gap-2 p-3">
        <span className="text-sm font-medium text-gray-800 truncate">{photo.author}</span>
        <button
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className="p-1 rounded-full hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-red-500"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
