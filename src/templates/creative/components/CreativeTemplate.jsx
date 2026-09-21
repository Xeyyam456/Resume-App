import PropTypes from 'prop-types'
import { useCreativeData } from '../hooks/useCreativeData'
import CreativeHeader from './CreativeHeader'
import CreativeContactRow from './CreativeContactRow'
import CreativeSkillRings from './CreativeSkillRings'
import CreativeExperience from './CreativeExperience'
import CreativeEducationProjects from './CreativeEducationProjects'
import styles from '../styles/CreativeTemplate.module.css'

function CreativeTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { fullName, initials, contactItems } = useCreativeData(personal)
  const isEmpty = !summary && experience.length === 0

  return (
    <div className={styles.root}>
      <CreativeHeader
        photo={personal.photo}
        initials={initials}
        fullName={fullName}
        jobTitle={personal.jobTitle}
        summary={summary}
      />
      <CreativeContactRow items={contactItems} />
      <CreativeSkillRings skills={skills} />
      <CreativeExperience experience={experience} />

      {isEmpty && (
        <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
      )}

      <CreativeEducationProjects education={education} projects={projects} />
    </div>
  )
}

CreativeTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default CreativeTemplate
