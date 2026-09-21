export function getInitials(firstName, lastName) {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
  return initials || '?'
}
