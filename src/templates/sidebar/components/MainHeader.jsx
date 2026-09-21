import PropTypes from 'prop-types'
import styles from './CVMain.module.css'

function MainHeader({ fullName, jobTitle }) {
  return (
    <div className={styles.nameSection}>
      <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
      {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}
    </div>
  )
}

MainHeader.propTypes = {
  fullName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
}

export default MainHeader
