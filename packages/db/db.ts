import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_DIRECT_URL,
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const conn = connect(config)

export default conn;