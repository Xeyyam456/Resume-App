import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import Tag from './Tag'
import styles from '../styles/EditorialLeft.module.css'

function EditorialLeft({ photo, initials, contactItems, skills, projects }) {
  return (
    <div className={styles.left}>
      <div className={styles.avatar}>
        {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : initials}
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
  )
}

EditorialLeft.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  contactItems: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default EditorialLeft
