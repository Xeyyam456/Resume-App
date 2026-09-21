import PropTypes from 'prop-types'
import CreativeHeading from './CreativeHeading'
import styles from '../styles/CreativeHeader.module.css'

function CreativeHeader({ photo, initials, fullName, jobTitle, summary }) {
  return (
    <div className={styles.header}>
      <div className={styles.photoBlock}>
        {photo ? (
          <img src={photo} alt="Profile" className={styles.photoImg} />
        ) : (
          <span className={styles.photoInitials}>{initials}</span>
        )}
      </div>

      <div className={styles.headerRight}>
        <div className={styles.nameLine}>
          <span className={styles.scriptIm}>I&apos;m</span>
          <span className={styles.scriptName}>{fullName || 'Your Name'}</span>
        </div>
        {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}

        {summary && (
          <div className={styles.aboutBlock}>
            <CreativeHeading>About me</CreativeHeading>
            <p className={styles.summary}>{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

CreativeHeader.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  summary: PropTypes.string.isRequired,
}

export default CreativeHeader
