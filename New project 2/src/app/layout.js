import './globals.css'

export const metadata = {
  title: 'Ronald Store Sulit Saya',
  description: 'Groceries loyalty and pointing system for Ronald Store Sulit Saya.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
