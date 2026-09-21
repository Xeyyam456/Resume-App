import PropTypes from 'prop-types'
import styles from './CVSidebar.module.css'

function SidebarAvatar({ photo, initials }) {
  return (
    <div className={styles.sidebarHeader}>
      <div className={styles.avatarWrap}>
        <div className={styles.avatar}>
          {photo ? (
            <img src={photo} alt="Profile" className={styles.avatarImg} />
          ) : (
            initials
          )}
        </div>
      </div>
    </div>
  )
}

SidebarAvatar.propTypes = {
  photo: PropTypes.string,
  initials: PropTypes.string.isRequired,
}

export default SidebarAvatar
