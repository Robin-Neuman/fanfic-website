const jwt_decode = require('jwt-decode')

export function formatText(text) {
  let replacedText = text.replace(/(-)/g, "  -")
  return replacedText
}

export function isLoggedIn(token, role) {
  if (token !== undefined && token !== null) {
    let decoded = jwt_decode(token)
    if (decoded !== undefined && decoded !== null) {
      if (Date.now() >= decoded.exp * 1000) {
        return false
      } else {
        if (decoded.role === role) {
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  } else {
    return false
  }
}