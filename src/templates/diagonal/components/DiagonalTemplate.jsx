import PropTypes from 'prop-types'
import { useDiagonalData } from '../hooks/useDiagonalData'
import DiagonalLeft from './DiagonalLeft'
import DiagonalRight from './DiagonalRight'
import styles from '../styles/DiagonalTemplate.module.css'

function DiagonalTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { fullName, initials, contactItems } = useDiagonalData(personal)

  return (
    <div className={styles.root}>
      <DiagonalLeft
        fullName={fullName}
        jobTitle={personal.jobTitle}
        summary={summary}
        experience={experience}
        projects={projects}
      />
      <DiagonalRight
        photo={personal.photo}
        initials={initials}
        contactItems={contactItems}
        skills={skills}
        education={education}
      />
    </div>
  )
}

DiagonalTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default DiagonalTemplate
