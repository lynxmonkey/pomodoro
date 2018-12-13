export const takeIfExists = (key, type = String) => {
  const item = localStorage.getItem(key)
  if (item) {
    return type === Number
      ? Number.parseFloat(item)
      : type === Boolean
        ? { false: false, true: true }[item]
        : type === Object || type === Array ? JSON.parse(item) : item
  }
}