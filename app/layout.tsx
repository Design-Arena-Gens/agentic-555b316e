import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CV Templates 2025 - 40 Plantillas Profesionales',
  description: 'Crea tu currículum profesional con nuestras 40 plantillas modernas para 2025',
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
