import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import styles from './DiagonalTemplate.module.css'

function DiagonalRight({ photo, initials, contactItems, skills, education }) {
  return (
    <div className={styles.right}>
      <div className={styles.avatar}>
        {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : initials}
      </div>

      {contactItems.length > 0 && (
        <div className={styles.rBlock}>
          <h3 className={styles.rHeading}>Contact Me</h3>
          <ul className={styles.contactList}>
            {contactItems.map((item, i) => (
              <li key={i} className={styles.contactItem}>
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
        <div className={styles.rBlock}>
          <h3 className={styles.rHeading}>Pro Skills</h3>
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

      {education.length > 0 && (
        <div className={styles.rBlock}>
          <h3 className={styles.rHeading}>Education</h3>
          {education.map(edu => (
            <div key={edu.id} className={styles.eduItem}>
              <div className={styles.eduDegree}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
              <div className={styles.eduSchool}>{edu.school}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

DiagonalRight.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  contactItems: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
}

export default DiagonalRight
