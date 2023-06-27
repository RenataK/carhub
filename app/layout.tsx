import './globals.css'
import { Footer, Navbar } from '@/components'

export const metadata = {
  title: 'CarHub',
  description: 'Discover the best car for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
				<Navbar />
				{children}
				<Footer />
			</body>
    </html>
  )
}
