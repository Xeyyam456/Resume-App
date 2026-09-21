import PropTypes from 'prop-types'
import FormInput from '@/shared/components/FormInput'
import styles from '../styles/PersonalInfoFields.module.css'

function PersonalInfoFields({ personal, onUpdate }) {
  return (
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
  )
}

PersonalInfoFields.propTypes = {
  personal: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default PersonalInfoFields
