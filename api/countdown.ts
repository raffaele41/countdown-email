import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export default function handler() {

  const launch = new Date("2026-04-01T00:00:00Z")
  const now = new Date()

  let diff = Math.floor((launch.getTime() - now.getTime()) / 1000 / 60 / 60)

  if (diff < 0) diff = 0

  const days = Math.floor(diff / 24)
  const hours = diff % 24

  return new ImageResponse(
    (
      <div
        style={{
          width: '600px',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1a0505',
          color: 'white',
          fontSize: 70,
          fontWeight: 900,
          fontFamily: 'Arial'
        }}
      >
        {String(days).padStart(2,'0')}d : {String(hours).padStart(2,'0')}h
      </div>
    ),
    {
      width: 600,
      height: 200
    }
  )
}
