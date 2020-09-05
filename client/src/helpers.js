const jwt_decode = require('jwt-decode')

export function formatText(text) {
  let replacedText = text.replace(/(-)/g, "  -")
  return replacedText
}

export function getRole(token) {
  if (token !== undefined && token !== null) {
    let decoded = jwt_decode(token)
    if (decoded !== undefined && decoded !== null) {
      return decoded.role
    } else {
      return false
    }
  }
}

// Shorten this func and maybe not have it as a helper
export function isLoggedIn(token, roles = ["user", "admin"]) {
  if (token !== undefined && token !== null) {
    let decoded = jwt_decode(token)
    if (decoded !== undefined && decoded !== null) {
      if (Date.now() >= decoded.exp * 1000) {
        return false
      } else {
        for (let i = 0; i < roles.length; i++) {
          if (decoded.role === roles[i]) {
            return true
          }
        }
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}