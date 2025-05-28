// pages/_app.js

import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </CartProvider>
  )
}
