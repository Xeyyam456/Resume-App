import PropTypes from 'prop-types'
import { getInitials } from '@/utils/initials'
import { usePhotoUpload } from '../hooks/usePhotoUpload'
import styles from '../styles/PhotoUpload.module.css'

function PhotoUpload({ photo, firstName, lastName, onUpdate }) {
  const handlePhotoChange = usePhotoUpload(onUpdate)
  const initials = getInitials(firstName, lastName)

  return (
    <div className={styles.photoRow}>
      <div className={styles.avatarPreview}>
        {photo ? (
          <img src={photo} alt="Profile" className={styles.avatarImg} />
        ) : (
          <span className={styles.avatarInitials}>{initials}</span>
        )}
      </div>
      <div className={styles.photoInfo}>
        <label className={styles.uploadBtn} htmlFor="photo-upload">
          {photo ? '🔄 Change Photo' : '📷 Upload Photo'}
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className={styles.photoInput}
          onChange={handlePhotoChange}
        />
        <p className={styles.photoHint}>JPG, PNG — CV və PDF-də görünür</p>
        {photo && (
          <button type="button" className={styles.removeBtn} onClick={() => onUpdate('photo', '')}>
            Remove photo
          </button>
        )}
      </div>
    </div>
  )
}

PhotoUpload.propTypes = {
  photo: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default PhotoUpload
