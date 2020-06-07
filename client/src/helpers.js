export function formatText(text) {
  let replacedText = text.replace(/(-)/g, "  -")
  return replacedText
}