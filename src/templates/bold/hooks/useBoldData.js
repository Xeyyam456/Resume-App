import { getInitials } from '@/utils/initials'
import { makeHref } from '@/utils/links'

export function useBoldData(personal) {
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✆', label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '✉', label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '↗', label: personal.website, href: makeHref(personal.website) },
    { icon: '◎', label: personal.location, href: null },
  ].filter(item => item.label)

  return { initials, contactItems }
}
