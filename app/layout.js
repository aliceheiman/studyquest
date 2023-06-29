import './globals.css'
import { AuthContextProvider } from '../src/context/AuthContext'
import { Footer, Navbar } from '@/components'

export const metadata = {
  title: 'Study Quest',
  description: 'Make studying an adventure',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <AuthContextProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthContextProvider>

      </body>
    </html>
  )
}
