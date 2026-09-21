import PropTypes from 'prop-types'
import SectionCard from '@/shared/components/SectionCard'
import PhotoUpload from './PhotoUpload'
import PersonalInfoFields from './PersonalInfoFields'

function PersonalInfoSection({ personal, onUpdate }) {
  return (
    <SectionCard icon="👤" title="Personal Information">
      <PhotoUpload
        photo={personal.photo}
        firstName={personal.firstName}
        lastName={personal.lastName}
        onUpdate={onUpdate}
      />
      <PersonalInfoFields personal={personal} onUpdate={onUpdate} />
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
