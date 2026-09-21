import { getInitials } from '@/utils/initials'
import { formatDate } from '@/utils/formatDate'
import { makeHref } from '@/utils/links'

export function useBannerData(personal, education, experience) {
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { label: personal.location, href: null },
    { label: personal.website, href: makeHref(personal.website) },
  ].filter(item => item.label)

  const timeline = [
    ...education.map(edu => ({
      id: `edu-${edu.id}`,
      title: edu.degree ? `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}` : edu.school,
      sub: edu.school,
      date: [formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – '),
      desc: null,
    })),
    ...experience.map(exp => ({
      id: `exp-${exp.id}`,
      title: exp.position,
      sub: exp.company,
      date: [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – '),
      desc: exp.description,
    })),
  ]

  return { fullName, initials, contactItems, timeline }
}
