import jwt from 'jsonwebtoken'

async function authToken() {
  // Admin API key goes here
  const key = process.env.GHOST_ADMIN_API_KEY

  // Split the key into ID and SECRET
  const [id, secret] = key.split(':')

  // Create the token (including decoding secret)
  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '1m',
    audience: `/admin/`
  })

  return token
}

export async function addSingleGhostPost(data: string) {
  const playload = { posts: [{ title: `${data}` }] }
  const token = await authToken()
  return fetch(`${process.env.GHOST_API_URL}/ghost/api/admin/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Ghost ${token}`,
    },
    body: JSON.stringify(playload)
  }).then(res => res.json())
}

export async function updateSingleGhostPost(data: string, postId: string) {
  const playload = { posts: [{ title: `${data}` }] }
  const token = await authToken()
  return fetch(`${process.env.GHOST_API_URL}/ghost/api/admin/posts/${postId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Ghost ${token}`,
    },
    body: JSON.stringify(playload)
  }).then(res => res.json())
}