import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler() {
  const launch = new Date('2026-04-01T00:00:00Z')
  const now = new Date()

  let diffHours = Math.floor((launch - now) / 1000 / 60 / 60)
  if (diffHours < 0) diffHours = 0

  const days = Math.floor(diffHours / 24)
  const hours = diffHours % 24

  const d = String(days).padStart(2, '0')
  const h = String(hours).padStart(2, '0')

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '600px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a0505',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 900,
          fontSize: 72,
        },
        children: `${d}d : ${h}h`,
      },
    },
    { width: 600, height: 200 }
  )
}
