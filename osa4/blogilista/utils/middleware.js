const tokenExtractor = (request, response, next) => {
    // tokenin ekstraktoiva koodi
    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
          return authorization.substring(7)
        
        }
        
        return null
      }
    return next()
    
  }
module.exports = {tokenExtractor}