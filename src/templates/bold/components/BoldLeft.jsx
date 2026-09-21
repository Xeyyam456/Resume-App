import PropTypes from 'prop-types'
import styles from '../styles/BoldLeft.module.css'

function BoldLeft({ photo, initials, contactItems, skills, education }) {
  return (
    <div className={styles.left}>
      <div className={styles.avatar}>
        {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : initials}
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
  )
}

BoldLeft.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  contactItems: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
}

export default BoldLeft
