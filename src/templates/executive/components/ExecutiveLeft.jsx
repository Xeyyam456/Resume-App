import PropTypes from 'prop-types'
import styles from './ExecutiveTemplate.module.css'

function ExecutiveLeft({ photo, initials, fullName, jobTitle, summary, contactItems }) {
  return (
    <div className={styles.left}>
      <div className={styles.avatar}>
        {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : initials}
      </div>
      <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
      {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}
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
  )
}

ExecutiveLeft.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  summary: PropTypes.string.isRequired,
  contactItems: PropTypes.array.isRequired,
}

export default ExecutiveLeft
