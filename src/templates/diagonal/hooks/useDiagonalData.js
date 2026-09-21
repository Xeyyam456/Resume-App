import { getInitials } from '@/utils/initials'
import { makeHref } from '@/utils/links'

export function useDiagonalData(personal) {
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { label: personal.location, href: null },
    { label: personal.website, href: makeHref(personal.website) },
    { label: personal.linkedin, href: makeHref(personal.linkedin) },
  ].filter(item => item.label)

  return { fullName, initials, contactItems }
}
