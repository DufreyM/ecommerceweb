export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-300 to-yellow-500">
      <img
        src="/pikachucorriendo.gif"
        alt="Cargando..."
        className="w-64 h-64 object-contain"
      />
      <p className="text-2xl font-bold text-yellow-900 mt-4 animate-pulse">
        Cargando cartas...
      </p>
    </div>
  );
}
