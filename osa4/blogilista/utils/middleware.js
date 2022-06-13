const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  // tokenin ekstraktoiva koodi
  const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } else {
      request.token = null
    }  
  next()
}

const userExtractor = async (request, response, next) => {
  // tokenin ekstraktoiva koodi
  const token = request.token
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = request.user
    user = await User.findById(decodedToken.id)
  }
  
  next()
}
  
module.exports = {tokenExtractor}