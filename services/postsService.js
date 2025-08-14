
export function getImageUrl(path, uploadsBaseUrl) {
  if (!path) return ''
  return uploadsBaseUrl + '/' + path.replace(/^\/?uploads\/?/, '')
}

export async function getCategoriesWithPosts(apiBaseUrl) {
  const categoriesEndpoint = `${apiBaseUrl}/api/categorias`
  const postsEndpoint = `${apiBaseUrl}/api/publicaciones`

  const resCats = await fetch(categoriesEndpoint, { credentials: 'include' })
  if (!resCats.ok) throw new Error('Error loading categories')
  const categories = await resCats.json()

  const categoriesWithPosts = await Promise.all(
    categories.map(async (category) => {
      const resPosts = await fetch(`${postsEndpoint}/categoria/${encodeURIComponent(category.nombre)}`, { credentials: 'include' })
      if (!resPosts.ok) return { ...category, publicaciones: [] }
      const publicaciones = await resPosts.json()
      return { ...category, publicaciones }
    })
  )

  return categoriesWithPosts.filter(category => category.publicaciones.length > 0)
}

export async function getCategoriesWithFirstPost(apiBaseUrl) {
  const categoriesEndpoint = `${apiBaseUrl}/api/categorias`
  const postsEndpoint = `${apiBaseUrl}/api/publicaciones`

  const resCats = await fetch(categoriesEndpoint, { credentials: 'include' })
  if (!resCats.ok) throw new Error('Error loading categories')
  const categories = await resCats.json()

  const categoriesWithExample = await Promise.all(
    categories.map(async (category) => {
      const resPosts = await fetch(`${postsEndpoint}/categoria/${encodeURIComponent(category.nombre)}`, { credentials: 'include' })
      if (!resPosts.ok) return { ...category, publicacion: null }
      const posts = await resPosts.json()
      return { ...category, publicacion: posts[0] || null }
    })
  )

  return categoriesWithExample.filter(category => category.publicacion)
}
