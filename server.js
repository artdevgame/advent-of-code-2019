const fastify = require('fastify')()
const path = require('path')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'src')
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()