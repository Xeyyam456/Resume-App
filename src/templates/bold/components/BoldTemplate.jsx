import PropTypes from 'prop-types'
import { useBoldData } from '../hooks/useBoldData'
import BoldLeft from './BoldLeft'
import BoldRight from './BoldRight'
import styles from '../styles/BoldTemplate.module.css'

function BoldTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { initials, contactItems } = useBoldData(personal)

  return (
    <div className={styles.root}>
      <BoldLeft
        photo={personal.photo}
        initials={initials}
        contactItems={contactItems}
        skills={skills}
        education={education}
      />
      <BoldRight
        firstName={personal.firstName}
        lastName={personal.lastName}
        jobTitle={personal.jobTitle}
        summary={summary}
        experience={experience}
        projects={projects}
      />
    </div>
  )
}

BoldTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default BoldTemplate
