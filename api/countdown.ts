export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  const launch = new Date('2026-04-01T00:00:00Z')
  const now = new Date()

  let diffHours = Math.floor((launch - now) / 1000 / 60 / 60)
  if (diffHours < 0) diffHours = 0

  const days = String(Math.floor(diffHours / 24)).padStart(2, '0')
  const hours = String(diffHours % 24).padStart(2, '0')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
      <rect width="600" height="200" fill="#1a0505"/>
      <text x="300" y="130" 
        font-family="Arial" font-size="90" font-weight="bold"
        fill="white" text-anchor="middle">
        ${days}d : ${hours}h
      </text>
    </svg>
  `

  const sharp = (await import('sharp')).default
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'no-cache, no-store')
  res.end(png)
}
