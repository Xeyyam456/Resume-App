import PropTypes from 'prop-types'
import { useEditorialData } from '../hooks/useEditorialData'
import EditorialLeft from './EditorialLeft'
import EditorialRight from './EditorialRight'
import styles from '../styles/EditorialTemplate.module.css'

function EditorialTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { fullName, initials, contactItems } = useEditorialData(personal)

  return (
    <div className={styles.root}>
      <EditorialLeft
        photo={personal.photo}
        initials={initials}
        contactItems={contactItems}
        skills={skills}
        projects={projects}
      />
      <EditorialRight
        fullName={fullName}
        jobTitle={personal.jobTitle}
        summary={summary}
        experience={experience}
        education={education}
      />
    </div>
  )
}

EditorialTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default EditorialTemplate
