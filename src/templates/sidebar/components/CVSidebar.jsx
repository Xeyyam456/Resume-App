import PropTypes from 'prop-types'
import { useCVSidebarData } from '../hooks/useCVSidebarData'
import SidebarAvatar from './SidebarAvatar'
import SidebarContact from './SidebarContact'
import SidebarSkills from './SidebarSkills'
import SidebarEducation from './SidebarEducation'
import styles from '../styles/CVSidebar.module.css'

function CVSidebar({ personal, skills, education }) {
  const { initials, contactItems } = useCVSidebarData(personal)

  return (
    <aside className={styles.sidebar}>
      <SidebarAvatar photo={personal.photo} initials={initials} />
      <div className={styles.sidebarBody}>
        <SidebarContact items={contactItems} />
        <SidebarSkills skills={skills} />
        <SidebarEducation education={education} />
      </div>
    </aside>
  )
}

CVSidebar.propTypes = {
  personal: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    linkedin: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  skills: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
}

export default CVSidebar
