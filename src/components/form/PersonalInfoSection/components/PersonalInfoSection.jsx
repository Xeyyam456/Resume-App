import PropTypes from 'prop-types'
import FormInput from '@/shared/components/FormInput'
import SectionCard from '@/shared/components/SectionCard'
import { getInitials } from '@/utils/initials'
import styles from './PersonalInfoSection.module.css'

function PersonalInfoSection({ personal, onUpdate }) {
  const handlePhotoChange = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onUpdate('photo', ev.target.result)
    reader.readAsDataURL(file)
  }

  const initials = getInitials(personal.firstName, personal.lastName)

  return (
    <SectionCard icon="👤" title="Personal Information">
      <div className={styles.photoRow}>
        <div className={styles.avatarPreview}>
          {personal.photo ? (
            <img src={personal.photo} alt="Profile" className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarInitials}>{initials}</span>
          )}
        </div>
        <div className={styles.photoInfo}>
          <label className={styles.uploadBtn} htmlFor="photo-upload">
            {personal.photo ? '🔄 Change Photo' : '📷 Upload Photo'}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className={styles.photoInput}
            onChange={handlePhotoChange}
          />
          <p className={styles.photoHint}>JPG, PNG — CV və PDF-də görünür</p>
          {personal.photo && (
            <button type="button" className={styles.removeBtn} onClick={() => onUpdate('photo', '')}>
              Remove photo
            </button>
          )}
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid2}`}>
        <FormInput
          label="First Name"
          id="firstName"
          value={personal.firstName}
          onChange={val => onUpdate('firstName', val)}
          placeholder="John"
          required
          validate={['required', 'name']}
        />
        <FormInput
          label="Last Name"
          id="lastName"
          value={personal.lastName}
          onChange={val => onUpdate('lastName', val)}
          placeholder="Doe"
          required
          validate={['required', 'name']}
        />
        <FormInput
          label="Job Title"
          id="jobTitle"
          value={personal.jobTitle}
          onChange={val => onUpdate('jobTitle', val)}
          placeholder="Senior Software Engineer"
          validate={['jobTitle']}
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={personal.email}
          onChange={val => onUpdate('email', val)}
          placeholder="john@example.com"
          required
          validate={['required', 'email']}
        />
        <FormInput
          label="Phone"
          id="phone"
          type="tel"
          value={personal.phone}
          onChange={val => onUpdate('phone', val)}
          placeholder="+1 (555) 000-0000"
          validate={['phone']}
        />
        <FormInput
          label="Location"
          id="location"
          value={personal.location}
          onChange={val => onUpdate('location', val)}
          placeholder="San Francisco, CA"
          validate={['location']}
        />
        <FormInput
          label="Website"
          id="website"
          value={personal.website}
          onChange={val => onUpdate('website', val)}
          placeholder="yourwebsite.dev"
          validate={['noAtSign', 'url']}
        />
        <FormInput
          label="LinkedIn"
          id="linkedin"
          value={personal.linkedin}
          onChange={val => onUpdate('linkedin', val)}
          placeholder="linkedin.com/in/yourname"
          validate={['linkedin']}
        />
      </div>
    </SectionCard>
  )
}

PersonalInfoSection.propTypes = {
  personal: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default PersonalInfoSection
