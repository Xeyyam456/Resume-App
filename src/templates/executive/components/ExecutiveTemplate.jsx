import PropTypes from 'prop-types'
import { useExecutiveData } from '../hooks/useExecutiveData'
import ExecutiveLeft from './ExecutiveLeft'
import ExecutiveRight from './ExecutiveRight'
import styles from '../styles/ExecutiveTemplate.module.css'

function ExecutiveTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { fullName, initials, contactItems } = useExecutiveData(personal)

  return (
    <div className={styles.root}>
      <ExecutiveLeft
        photo={personal.photo}
        initials={initials}
        fullName={fullName}
        jobTitle={personal.jobTitle}
        summary={summary}
        contactItems={contactItems}
      />
      <ExecutiveRight
        summary={summary}
        education={education}
        experience={experience}
        skills={skills}
        projects={projects}
      />
    </div>
  )
}

ExecutiveTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default ExecutiveTemplate
