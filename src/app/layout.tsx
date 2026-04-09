import type { Metadata } from 'next'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'INSANITY - Soluciones Digitales',
  description: 'Transformamos ideas en soluciones digitales extraordinarias. Tecnología de vanguardia para impulsar tu negocio al futuro.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
