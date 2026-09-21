import PropTypes from 'prop-types'
import CVSidebar from './CVSidebar'
import CVMain from './CVMain'
import styles from '../styles/SidebarTemplate.module.css'

function SidebarTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData

  return (
    <div className={styles.root}>
      <CVSidebar personal={personal} skills={skills} education={education} />
      <CVMain personal={personal} summary={summary} experience={experience} projects={projects} />
    </div>
  )
}

SidebarTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default SidebarTemplate
