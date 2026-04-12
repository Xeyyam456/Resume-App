import PropTypes from 'prop-types'
import FormInput from '@/components/ui/FormInput'
import SectionCard from '@/components/ui/SectionCard'
import styles from './PersonalInfoSection.module.css'

function PersonalInfoSection({ personal, onUpdate }) {
  return (
    <SectionCard icon="👤" title="Personal Information">
      <div className={`${styles.grid} ${styles.grid2}`}>
        <FormInput
          label="First Name"
          id="firstName"
          value={personal.firstName}
          onChange={val => onUpdate('firstName', val)}
          placeholder="John"
          required
        />
        <FormInput
          label="Last Name"
          id="lastName"
          value={personal.lastName}
          onChange={val => onUpdate('lastName', val)}
          placeholder="Doe"
          required
        />
        <FormInput
          label="Job Title"
          id="jobTitle"
          value={personal.jobTitle}
          onChange={val => onUpdate('jobTitle', val)}
          placeholder="Senior Software Engineer"
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={personal.email}
          onChange={val => onUpdate('email', val)}
          placeholder="john@example.com"
          required
        />
        <FormInput
          label="Phone"
          id="phone"
          type="tel"
          value={personal.phone}
          onChange={val => onUpdate('phone', val)}
          placeholder="+1 (555) 000-0000"
        />
        <FormInput
          label="Location"
          id="location"
          value={personal.location}
          onChange={val => onUpdate('location', val)}
          placeholder="San Francisco, CA"
        />
        <FormInput
          label="Website"
          id="website"
          value={personal.website}
          onChange={val => onUpdate('website', val)}
          placeholder="yourwebsite.dev"
        />
        <FormInput
          label="LinkedIn"
          id="linkedin"
          value={personal.linkedin}
          onChange={val => onUpdate('linkedin', val)}
          placeholder="linkedin.com/in/yourname"
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default PersonalInfoSection
