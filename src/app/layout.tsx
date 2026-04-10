import type { Metadata } from 'next'
import '../styles/index.css'
import { WhatsAppButton } from './components/WhatsAppButton'
import { CosmicComets } from './components/CosmicComets'
import { CursorEffect } from './components/CursorEffect'
import { BigBang } from './components/BigBang'

export const metadata: Metadata = {
  title: 'INSANITY - Soluciones Digitales',
  description:
    'Transformamos ideas en soluciones digitales extraordinarias. Tecnología de vanguardia para impulsar tu negocio al futuro.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Mouse glow + particle trail */}
        <BigBang />
        <CursorEffect />
        {/* Global comet layer — flies over all sections */}
        <CosmicComets />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
