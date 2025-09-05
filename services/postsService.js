// postsService.js

/**
 * Devuelve la URL final de una imagen, ya sea absoluta (Supabase) o relativa (backend)
 * @param {string} path - URL o path de la foto
 * @param {string} uploadsBaseUrl - Base URL del backend para uploads
 * @returns {string} URL lista para usar en <img>
 */
export function getImageUrl(path, uploadsBaseUrl) {
  if (!path) return ''

  // Si es URL absoluta (Supabase u otra) → devolver tal cual
  if (path.startsWith('http')) return path

  // Si es path relativo del backend → concatena
  return uploadsBaseUrl + '/' + path.replace(/^\/?uploads\/?/, '')
}

/**
 * Obtiene todas las categorías junto con sus publicaciones
 * Cada publicación tendrá la URL de su foto ya lista para usar
 * @param {string} apiBaseUrl
 */
export async function getCategoriesWithPosts(apiBaseUrl) {
  const categoriesEndpoint = `${apiBaseUrl}/api/categorias`
  const postsEndpoint = `${apiBaseUrl}/api/publicaciones`
  const uploadsBaseUrl = `${apiBaseUrl}/api/uploads`

  const resCats = await fetch(categoriesEndpoint, { credentials: 'include' })
  if (!resCats.ok) throw new Error('Error loading categories')
  const categories = await resCats.json()

  const categoriesWithPosts = await Promise.all(
    categories.map(async (category) => {
      const resPosts = await fetch(`${postsEndpoint}/categoria/${encodeURIComponent(category.nombre)}`, { credentials: 'include' })
      if (!resPosts.ok) return { ...category, publicaciones: [] }

      let publicaciones = await resPosts.json()

      // Reemplazar la URL de la foto usando getImageUrl
      publicaciones = publicaciones.map(pub => ({
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
 * Cada publicación tendrá la URL de su foto ya lista para usar
 * @param {string} apiBaseUrl
 */
export async function getCategoriesWithFirstPost(apiBaseUrl) {
  const categoriesEndpoint = `${apiBaseUrl}/api/categorias`
  const postsEndpoint = `${apiBaseUrl}/api/publicaciones`
  const uploadsBaseUrl = `${apiBaseUrl}/api/uploads`

  const resCats = await fetch(categoriesEndpoint, { credentials: 'include' })
  if (!resCats.ok) throw new Error('Error loading categories')
  const categories = await resCats.json()

  const categoriesWithExample = await Promise.all(
    categories.map(async (category) => {
      const resPosts = await fetch(`${postsEndpoint}/categoria/${encodeURIComponent(category.nombre)}`, { credentials: 'include' })
      if (!resPosts.ok) return { ...category, publicacion: null }

      const posts = await resPosts.json()

      // Si hay publicaciones, reemplaza la URL de la primera
      const firstPost = posts[0] || null
      if (firstPost && firstPost.foto) {
        firstPost.foto.url = getImageUrl(firstPost.foto.url, uploadsBaseUrl)
      }

      return { ...category, publicacion: firstPost }
    })
  )

  return categoriesWithExample.filter(category => category.publicacion)
}
