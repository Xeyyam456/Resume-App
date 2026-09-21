import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import { getInitials } from '@/utils/initials'
import { formatDate } from '@/utils/formatDate'
import styles from './ExecutiveTemplate.module.css'

function makeHref(value) {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.includes('@')) return `mailto:${value}`
  return `https://${value}`
}

function GoldHeading({ children }) {
  return <h2 className={styles.goldBar}>{children}</h2>
}

function ExecutiveTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✆', label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '✉', label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '◎', label: personal.location, href: null },
    { icon: '↗', label: personal.website, href: makeHref(personal.website) },
    { icon: 'in', label: personal.linkedin, href: makeHref(personal.linkedin) },
  ].filter(item => item.label)

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          {personal.photo ? (
            <img src={personal.photo} alt="Profile" className={styles.avatarImg} />
          ) : (
            initials
          )}
        </div>
        <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
        {personal.jobTitle && <div className={styles.jobTitle}>{personal.jobTitle}</div>}
        {summary && <p className={styles.bio}>{summary}</p>}

        {contactItems.length > 0 && (
          <div className={styles.contactBlock}>
            <h3 className={styles.contactHeading}>Contact</h3>
            <ul className={styles.contactList}>
              {contactItems.map((item, i) => (
                <li key={i} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className={styles.contactLink}>{item.label}</a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.right}>
        {education.length > 0 && (
          <section className={styles.block}>
            <GoldHeading>Education</GoldHeading>
            {education.map(edu => (
              <div key={edu.id} className={styles.entry}>
                <div className={styles.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                <div className={styles.entrySub}>{edu.school}</div>
                {(edu.startDate || edu.endDate) && (
                  <div className={styles.entryDate}>{[formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – ')}</div>
                )}
              </div>
            ))}
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.block}>
            <GoldHeading>Experience</GoldHeading>
            {experience.map(exp => {
              const dateRange = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ')
              return (
                <div key={exp.id} className={styles.entry}>
                  <div className={styles.entryTitle}>{exp.position}</div>
                  <div className={styles.entrySub}>{exp.company}{dateRange ? ` · ${dateRange}` : ''}</div>
                  {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
                </div>
              )
            })}
          </section>
        )}

        {!summary && education.length === 0 && experience.length === 0 && (
          <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
        )}

        {skills.length > 0 && (
          <section className={styles.block}>
            <GoldHeading>Skills</GoldHeading>
            <div className={styles.skillList}>
              {skills.map(skill => {
                const rank = SKILL_LEVEL_RANKS[skill.level] ?? 3
                return (
                  <div key={skill.id} className={styles.skillRow}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: `${rank * 20}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className={styles.block}>
            <GoldHeading>Projects</GoldHeading>
            {projects.map(project => (
              <div key={project.id} className={styles.entry}>
                <div className={styles.entryTitle}>{project.name}</div>
                {project.description && <div className={styles.entryDesc}>{project.description}</div>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

ExecutiveTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default ExecutiveTemplate
