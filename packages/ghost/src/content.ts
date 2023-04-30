import GhostContentAPI, { GhostContentAPIOptions } from '@tryghost/content-api'

const config: GhostContentAPIOptions = {
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v5.0"
}
// Create API instance with site credentials
const api = new GhostContentAPI(config)

export async function getAllGhostPosts() {
    return await api.posts
      .browse({ limit: 'all' })
      .then((posts: any) => {
        posts = posts.map((post: any) => {
          post = {
            ...post,
            coverImage: post.feature_image || null,
          }
          return post
        })
        return posts
      })
    // .catch((err) => console.error(err))
  }
  
export async function getSingleGhostPost(postId: string) {
    return (
      (await api.posts
        .read({ id: postId })
        .then((post: any) => {
          post = {
            ...post,
            coverImage: post.feature_image || null,
          }
          return post
        })
        .catch((err) => {
          return undefined
        })) || undefined
    )
}