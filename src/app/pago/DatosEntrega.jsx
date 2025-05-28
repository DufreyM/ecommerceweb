export default function DatosEntrega ({
  nombre,
  setNombre,
  direccion,
  setDireccion,
  ciudad,
  setCiudad,
  codigoPostal,
  setCodigoPostal
}) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Datos de entrega</h2>
      <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nombre completo"
          className="border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          className="border p-2 rounded"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ciudad"
          className="border p-2 rounded"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Código postal"
          className="border p-2 rounded"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
        />
      </form>
    </section>
  )
}
