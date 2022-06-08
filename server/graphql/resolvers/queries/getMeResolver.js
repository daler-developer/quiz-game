const errors = require('../../../utils/errors')

module.exports = async (_, {}, ctx) => {
  if (ctx.user) {
    return ctx.user
  }

  throw new errors.NotAuthenticated()
}
