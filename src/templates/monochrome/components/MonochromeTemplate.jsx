import PropTypes from 'prop-types'
import { useMonochromeData } from '../hooks/useMonochromeData'
import MonochromeSide from './MonochromeSide'
import MonochromeMain from './MonochromeMain'
import styles from '../styles/MonochromeTemplate.module.css'

function MonochromeTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { fullName, initials, contactItems } = useMonochromeData(personal)

  return (
    <div className={styles.root}>
      <MonochromeSide
        photo={personal.photo}
        initials={initials}
        fullName={fullName}
        jobTitle={personal.jobTitle}
        contactItems={contactItems}
        education={education}
        skills={skills}
      />
      <MonochromeMain summary={summary} experience={experience} projects={projects} />
    </div>
  )
}

MonochromeTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default MonochromeTemplate
