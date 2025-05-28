export default function SearchBar ({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="w-full p-2 border border-gray-300 rounded bg-white"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
