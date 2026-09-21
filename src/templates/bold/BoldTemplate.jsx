import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import { getInitials } from '@/utils/initials'
import { formatDate } from '@/utils/formatDate'
import styles from './BoldTemplate.module.css'

function makeHref(value) {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.includes('@')) return `mailto:${value}`
  return `https://${value}`
}

function DarkHeading({ children }) {
  return <h2 className={styles.darkBadge}>{children}</h2>
}

function BoldTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✆', label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '✉', label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '↗', label: personal.website, href: makeHref(personal.website) },
    { icon: '◎', label: personal.location, href: null },
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

        {contactItems.length > 0 && (
          <div className={styles.sBlock}>
            <h3 className={styles.sHeading}>Contacts</h3>
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

        {skills.length > 0 && (
          <div className={styles.sBlock}>
            <h3 className={styles.sHeading}>Skills</h3>
            <ul className={styles.skillList}>
              {skills.map(skill => (
                <li key={skill.id} className={styles.skillItem}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}

        {education.length > 0 && (
          <div className={styles.sBlock}>
            <h3 className={styles.sHeading}>Education</h3>
            <div className={styles.timeline}>
              {education.map(edu => (
                <div key={edu.id} className={styles.timelineItem}>
                  <div className={styles.eduDegree}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className={styles.eduSchool}>{edu.school}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.nameBlock}>
          <h1 className={styles.name}>
            <span className={styles.nameFirst}>{personal.firstName || 'Your'}</span>{' '}
            <span className={styles.nameLast}>{personal.lastName || 'Name'}</span>
          </h1>
          {personal.jobTitle && <div className={styles.jobTitle}>{personal.jobTitle}</div>}
        </div>

        {summary && (
          <section className={styles.block}>
            <DarkHeading>About Me</DarkHeading>
            <p className={styles.summary}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.block}>
            <DarkHeading>Experience</DarkHeading>
            <div className={styles.timeline}>
              {experience.map(exp => {
                const dateRange = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ')
                return (
                  <div key={exp.id} className={styles.timelineItem}>
                    <div className={styles.entryHeader}>
                      <span className={styles.entryTitle}>{exp.position}</span>
                      {dateRange && <span className={styles.entryDate}>{dateRange}</span>}
                    </div>
                    <div className={styles.entrySub}>{exp.company}</div>
                    {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {!summary && experience.length === 0 && (
          <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
        )}

        {projects.length > 0 && (
          <section className={styles.block}>
            <DarkHeading>Projects</DarkHeading>
            {projects.map(project => (
              <div key={project.id} className={styles.projectItem}>
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

BoldTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default BoldTemplate
