import PropTypes from 'prop-types'
import styles from './CVSidebar.module.css'

const LEVEL_WIDTHS = {
  Beginner: 18,
  Elementary: 36,
  Intermediate: 55,
  Advanced: 75,
  Expert: 95,
}

function getInitials(firstName, lastName) {
  const f = firstName ? firstName[0].toUpperCase() : ''
  const l = lastName ? lastName[0].toUpperCase() : ''
  return f + l || '?'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

function makeHref(value) {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.includes('@')) return `mailto:${value}`
  return `https://${value}`
}

function CVSidebar({ personal, skills, education }) {
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✉', value: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '✆', value: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '◎', value: personal.location, href: null },
    { icon: '↗', value: personal.website, href: makeHref(personal.website) },
    { icon: 'in', value: personal.linkedin, href: makeHref(personal.linkedin) },
  ].filter(item => item.value)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            {personal.photo ? (
              <img src={personal.photo} alt="Profile" className={styles.avatarImg} />
            ) : (
              initials
            )}
          </div>
        </div>
      </div>

      <div className={styles.sidebarBody}>
      {contactItems.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Contact</div>
          <ul className={styles.contactList}>
            {contactItems.map((item, i) => (
              <li key={i} className={styles.contactItem}>
                <span className={styles.contactIcon}>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={styles.contactLink}>{item.value}</a>
                ) : (
                  <span>{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {skills.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Skills</div>
          <div className={styles.skillList}>
            {skills.map(skill => (
              <div key={skill.id} className={styles.skill}>
                <div className={styles.skillRow}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillBadge}>{skill.level}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${LEVEL_WIDTHS[skill.level] ?? 50}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Education</div>
          {education.map(edu => {
            const startDate = formatDate(edu.startDate)
            const endDate = formatDate(edu.endDate)
            const dateRange = [startDate, endDate].filter(Boolean).join(' – ')
            return (
              <div key={edu.id} className={styles.eduItem}>
                <div className={styles.eduDegree}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </div>
                <div className={styles.eduSchool}>{edu.school}</div>
                {dateRange && <div className={styles.eduDate}>{dateRange}</div>}
                {edu.gpa && <div className={styles.eduDate}>GPA: {edu.gpa}</div>}
              </div>
            )
          })}
        </div>
      )}
      </div>
    </aside>
  )
}

CVSidebar.propTypes = {
  personal: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    linkedin: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    })
  ).isRequired,
  education: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      school: PropTypes.string,
      degree: PropTypes.string,
      field: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      gpa: PropTypes.string,
    })
  ).isRequired,
}

export default CVSidebar
