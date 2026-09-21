import PropTypes from 'prop-types'
import styles from './BannerTemplate.module.css'

function BannerHeader({ photo, initials, fullName, jobTitle, contactItems }) {
  return (
    <div className={styles.banner}>
      <div className={styles.avatar}>
        {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : initials}
      </div>
      <div className={styles.bannerInfo}>
        <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
        {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}
        {contactItems.length > 0 && (
          <div className={styles.contactRow}>
            {contactItems.map((item, i) => (
              item.href ? (
                <a key={i} href={item.href} target="_blank" rel="noreferrer" className={styles.contactItem}>{item.label}</a>
              ) : (
                <span key={i} className={styles.contactItem}>{item.label}</span>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

BannerHeader.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  contactItems: PropTypes.array.isRequired,
}

export default BannerHeader
