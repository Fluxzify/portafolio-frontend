// postsService.js

/**
 * Devuelve la URL final de una imagen, ya sea absoluta (Supabase) o relativa (backend)
 * @param {string} path - URL o path de la foto
 * @param {string} uploadsBaseUrl - Base URL del backend para uploads
 * @returns {string} URL lista para usar en <img>
 */
export function getImageUrl(path, uploadsBaseUrl) {
  if (!path) return ''

  // URL absoluta → encodeURI para evitar errores 400
  if (path.startsWith('http')) return encodeURI(path)

  // Path relativo del backend
  const cleanPath = path.replace(/^\/?uploads\/?/, '')
  return `${uploadsBaseUrl}/${encodeURIComponent(cleanPath)}`
}

/**
 * Obtiene todas las categorías junto con sus publicaciones
 * Cada publicación tendrá la URL de su foto ya lista para usar
 */
export async function getCategoriesWithPosts(apiBaseUrl) {
  const categoriesEndpoint = `${apiBaseUrl}/api/categorias`
  const postsEndpoint = `${apiBaseUrl}/api/publicaciones`
  const uploadsBaseUrl = `${apiBaseUrl}/api/uploads`

  const resCats = await fetch(categoriesEndpoint, { credentials: 'include' })
  if (!resCats.ok) throw new Error('Error al cargar categorías')
  const categories = await resCats.json()

  const categoriesWithPosts = await Promise.all(
    categories.map(async (category) => {
      const resPosts = await fetch(`${postsEndpoint}/categoria/${encodeURIComponent(category.nombre)}`, { credentials: 'include' })
      if (!resPosts.ok) return { ...category, publicaciones: [] }

      const publicaciones = (await resPosts.json()).map(pub => ({
        ...pub,
        foto: {
          ...pub.foto,
          url: getImageUrl(pub.foto?.url, uploadsBaseUrl)
        }
      }))

      return { ...category, publicaciones }
    })
  )

  return categoriesWithPosts.filter(category => category.publicaciones.length > 0)
}

/**
 * Obtiene las categorías con la primera publicación de cada una
 */
export async function getCategoriesWithFirstPost(apiBaseUrl) {
  const categoriesEndpoint = `${apiBaseUrl}/api/categorias`
  const postsEndpoint = `${apiBaseUrl}/api/publicaciones`
  const uploadsBaseUrl = `${apiBaseUrl}/api/uploads`

  const resCats = await fetch(categoriesEndpoint, { credentials: 'include' })
  if (!resCats.ok) throw new Error('Error al cargar categorías')
  const categories = await resCats.json()

  const categoriesWithExample = await Promise.all(
    categories.map(async (category) => {
      const resPosts = await fetch(`${postsEndpoint}/categoria/${encodeURIComponent(category.nombre)}`, { credentials: 'include' })
      if (!resPosts.ok) return { ...category, publicacion: null }

      const posts = await resPosts.json()
      const firstPost = posts[0] || null

      if (firstPost?.foto) {
        firstPost.foto.url = getImageUrl(firstPost.foto.url, uploadsBaseUrl)
      }

      return { ...category, publicacion: firstPost }
    })
  )

  return categoriesWithExample.filter(category => category.publicacion)
}
