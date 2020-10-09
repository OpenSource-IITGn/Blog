export const generateInitials = (first_name, last_name) => {
  const first = first_name[0]
  let second = ''
  if (last_name) {
    second = last_name[0]
  }
  return `${first}${second}`.toUpperCase()
}
