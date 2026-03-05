import { createCanvas } from '@napi-rs/canvas'

export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  const launch = new Date('2026-04-01T00:00:00Z')
  const now = new Date()

  let diffHours = Math.floor((launch - now) / 1000 / 60 / 60)
  if (diffHours < 0) diffHours = 0

  const days = String(Math.floor(diffHours / 24)).padStart(2, '0')
  const hours = String(diffHours % 24).padStart(2, '0')

  const canvas = createCanvas(600, 200)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#1a0505'
  ctx.fillRect(0, 0, 600, 200)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 80px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${days}d : ${hours}h`, 300, 110)

  const buffer = canvas.toBuffer('image/png')

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'no-cache, no-store')
  res.end(buffer)
}
