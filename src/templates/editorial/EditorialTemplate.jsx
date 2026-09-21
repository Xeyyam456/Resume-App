import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import { getInitials } from '@/utils/initials'
import { formatDate } from '@/utils/formatDate'
import styles from './EditorialTemplate.module.css'

function makeHref(value) {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.includes('@')) return `mailto:${value}`
  return `https://${value}`
}

function Tag({ icon, children }) {
  return (
    <h3 className={styles.sTag}>
      <span className={styles.sTagIcon}>{icon}</span>
      <span className={styles.sTagPill}>{children}</span>
    </h3>
  )
}

function EditorialTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const initials = getInitials(personal.firstName, personal.lastName)

  const contactItems = [
    { icon: '✆', label: personal.phone, href: personal.phone ? `tel:${personal.phone}` : null },
    { icon: '✉', label: personal.email, href: personal.email ? `mailto:${personal.email}` : null },
    { icon: '◎', label: personal.location, href: null },
    { icon: '↗', label: personal.website, href: makeHref(personal.website) },
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
            <Tag icon="☎">Contact Me</Tag>
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
            <Tag icon="✎">Skills</Tag>
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
          </div>
        )}

        {projects.length > 0 && (
          <div className={styles.sBlock}>
            <Tag icon="★">Projects</Tag>
            <div className={styles.badgeCircles}>
              {projects.slice(0, 3).map(project => (
                <div key={project.id} className={styles.projectBadge} title={project.name}>
                  {project.name.slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.nameZone}>
          <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
          {personal.jobTitle && <div className={styles.jobTitle}>{personal.jobTitle}</div>}
        </div>

        <div className={styles.card}>
          {summary && (
            <section className={styles.block}>
              <h2 className={styles.heading}>Profile</h2>
              <p className={styles.summary}>{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.heading}>Experience</h2>
              {experience.map(exp => {
                const dateRange = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ')
                return (
                  <div key={exp.id} className={styles.entry}>
                    <span className={styles.bullet} />
                    <div className={styles.entryBody}>
                      <div className={styles.entryHeader}>
                        <span className={styles.entryTitle}>{exp.position}</span>
                        {dateRange && <span className={styles.entryDate}>{dateRange}</span>}
                      </div>
                      <div className={styles.entrySub}>{exp.company}</div>
                      {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
                    </div>
                  </div>
                )
              })}
            </section>
          )}

          {education.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.heading}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className={styles.entry}>
                  <span className={styles.bullet} />
                  <div className={styles.entryBody}>
                    <div className={styles.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                    <div className={styles.entrySub}>{edu.school}</div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {!summary && experience.length === 0 && education.length === 0 && (
            <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
          )}
        </div>
      </div>
    </div>
  )
}

EditorialTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default EditorialTemplate
