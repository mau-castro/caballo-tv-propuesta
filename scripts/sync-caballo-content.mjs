import { mkdir, readFile, writeFile } from 'node:fs/promises'

const baseUrl = 'https://www.caballo.tv/v2/wp-json/wp/v2'
const outputDir = 'public/content'
const outputFile = `${outputDir}/articles.json`
const indexFile = `${outputDir}/index.json`
const decode = value => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#8217;/g, '’').trim()
const date = value => {
  const parsed = new Date(`${value}T12:00:00`)
  return Number.isNaN(parsed.valueOf()) ? 'ARCHIVO CABALLO TV' : new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).format(parsed).replace('.', '').toUpperCase()
}
const images = html => [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(match => match[1]).filter((item, index, list) => list.indexOf(item) === index)
const sanitize = html => html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
  .replace(/<form[\s\S]*?<\/form>/gi, '')
  .replace(/\s(?:href|target|rel)=(['"]).*?\1/gi, '')
  .replace(/\sstyle=(['"]).*?\1/gi, '')

async function request(url, retries = 4) {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'CaballoTV-content-migration/1.0' } })
      if (response.ok) return response
      if (response.status < 500) throw new Error(`${response.status} ${response.statusText}`)
    } catch (error) {
      if (attempt === retries - 1) throw error
    }
    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
  }
  throw new Error('No se pudo obtener contenido')
}

await mkdir(outputDir, { recursive: true })
let categories = new Map()
try {
  const response = await request(`${baseUrl}/categories?per_page=100`)
  const data = await response.json()
  categories = new Map(data.map(category => [category.id, category.name.toUpperCase()]))
} catch { /* Existing data is preserved if the origin is unavailable. */ }

try {
  const first = await request(`${baseUrl}/posts?per_page=50&page=1&_fields=id,date,slug,title,content,excerpt,categories`)
  const totalPages = Number(first.headers.get('X-WP-TotalPages') || 1)
  const firstPage = await first.json()
  const posts = [...firstPage]
  for (let page = 2; page <= totalPages; page += 1) {
    const response = await request(`${baseUrl}/posts?per_page=50&page=${page}&_fields=id,date,slug,title,content,excerpt,categories`)
    posts.push(...await response.json())
    process.stdout.write(`\rSincronizando archivo: ${page}/${totalPages}`)
  }
  const articles = posts.map(post => {
    const body = sanitize(post.content.rendered)
    const articleImages = images(body)
    return {
      id: post.id,
      slug: post.slug,
      title: decode(post.title.rendered),
      date: date(post.date),
      category: categories.get(post.categories?.[0]) || 'REVISTA',
      excerpt: decode(post.excerpt.rendered),
      content: body,
      images: articleImages,
      image: articleImages[0] || '',
    }
  })
  const generatedAt = new Date().toISOString()
  const index = articles.map(({ id, slug, title, date, category, excerpt, image, images: imageList }) => ({ id, slug, title, date, category, excerpt, image, images: imageList.slice(0, 1) }))
  await writeFile(indexFile, JSON.stringify({ generatedAt, total: articles.length, articles: index }))
  await writeFile(outputFile, JSON.stringify({ generatedAt, total: articles.length, articles }))
  console.log(`\nArchivo local actualizado: ${articles.length} artículos.`)
} catch (error) {
  try { await readFile(outputFile) } catch { await writeFile(outputFile, JSON.stringify({ generatedAt: null, total: 0, articles: [] })) }
  console.warn(`\nLa fuente no respondió; se conserva el archivo local. ${error.message}`)
}
