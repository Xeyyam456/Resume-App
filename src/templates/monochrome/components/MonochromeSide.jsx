import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import styles from './MonochromeTemplate.module.css'

function MonochromeSide({ photo, initials, fullName, jobTitle, contactItems, education, skills }) {
  return (
    <div className={styles.side}>
      <div className={styles.avatar}>
        {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : initials}
      </div>
      <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
      {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}

      {contactItems.length > 0 && (
        <div className={styles.sBlock}>
          <h3 className={styles.sHeading}>Contact</h3>
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

      {education.length > 0 && (
        <div className={styles.sBlock}>
          <h3 className={styles.sHeading}>Education</h3>
          {education.map(edu => (
            <div key={edu.id} className={styles.eduItem}>
              <div className={styles.eduDegree}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
              <div className={styles.eduSchool}>{edu.school}</div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className={styles.sBlock}>
          <h3 className={styles.sHeading}>Skills</h3>
          <div className={styles.skillList}>
            {skills.map(skill => {
              const rank = SKILL_LEVEL_RANKS[skill.level] ?? 3
              return (
                <div key={skill.id} className={styles.skillRow}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <div className={styles.bars}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} className={`${styles.bar} ${i <= rank ? styles.barFilled : ''}`} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

MonochromeSide.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  contactItems: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
}

export default MonochromeSide
