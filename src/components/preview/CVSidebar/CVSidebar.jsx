import PropTypes from 'prop-types'
import styles from './CVSidebar.module.css'

const LEVEL_DOTS = {
  Beginner: 1,
  Elementary: 2,
  Intermediate: 3,
  Advanced: 4,
  Expert: 5,
}
const TOTAL_DOTS = 5

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

function CVSidebar({ personal, skills, education }) {
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✉', value: personal.email },
    { icon: '✆', value: personal.phone },
    { icon: '◎', value: personal.location },
    { icon: '⊕', value: personal.website },
    { icon: 'in', value: personal.linkedin },
  ].filter(item => item.value)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.avatarRing} />

      {contactItems.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Contact</div>
          <ul className={styles.contactList}>
            {contactItems.map((item, i) => (
              <li key={i} className={styles.contactItem}>
                <span className={styles.contactIcon}>{item.icon}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {skills.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Skills</div>
          {skills.map(skill => (
            <div key={skill.id} className={styles.skill}>
              <div className={styles.skillName}>
                <span>{skill.name}</span>
                <span className={styles.skillLevelText}>{skill.level}</span>
              </div>
              <div className={styles.dotTrack}>
                {Array.from({ length: TOTAL_DOTS }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`${styles.dot} ${idx < (LEVEL_DOTS[skill.level] ?? 3) ? styles.dotFilled : ''}`}
                  />
                ))}
              </div>
            </div>
          ))}
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
