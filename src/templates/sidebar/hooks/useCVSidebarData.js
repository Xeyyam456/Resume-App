import { getInitials } from '@/utils/initials'
import { makeHref } from '@/utils/links'

export function useCVSidebarData(personal) {
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✉', value: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '✆', value: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '◎', value: personal.location, href: null },
    { icon: '↗', value: personal.website, href: makeHref(personal.website) },
    { icon: 'in', value: personal.linkedin, href: makeHref(personal.linkedin) },
  ].filter(item => item.value)

  return { initials, contactItems }
}
