import { getInitials } from '@/utils/initials'
import { makeHref } from '@/utils/links'

export function useExecutiveData(personal) {
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✆', label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '✉', label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '◎', label: personal.location, href: null },
    { icon: '↗', label: personal.website, href: makeHref(personal.website) },
    { icon: 'in', label: personal.linkedin, href: makeHref(personal.linkedin) },
  ].filter(item => item.label)

  return { fullName, initials, contactItems }
}
