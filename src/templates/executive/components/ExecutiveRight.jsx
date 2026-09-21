import PropTypes from 'prop-types'
import ExecutiveEducation from './ExecutiveEducation'
import ExecutiveExperience from './ExecutiveExperience'
import ExecutiveSkills from './ExecutiveSkills'
import ExecutiveProjects from './ExecutiveProjects'
import styles from '../styles/ExecutiveRight.module.css'

function ExecutiveRight({ summary, education, experience, skills, projects }) {
  const isEmpty = !summary && education.length === 0 && experience.length === 0

  return (
    <div className={styles.right}>
      <ExecutiveEducation education={education} />
      <ExecutiveExperience experience={experience} />
      {isEmpty && <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>}
      <ExecutiveSkills skills={skills} />
      <ExecutiveProjects projects={projects} />
    </div>
  )
}

ExecutiveRight.propTypes = {
  summary: PropTypes.string,
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default ExecutiveRight
