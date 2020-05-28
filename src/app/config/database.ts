export default {
  default: {
    auth: process.env.DB_USER ? `${process.env.DB_USER}:${process.env.DB_PASS}@` : '',
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    base: process.env.DB_BASE ? process.env.DB_BASE : 'test',
    port: process.env.DB_PORT ? `:${process.env.DB_PORT}` : '',
    repl: process.env.DB_REPL || false,
  },
}
