import PropTypes from 'prop-types'
import MainHeader from './MainHeader'
import MainExperience from './MainExperience'
import MainProjects from './MainProjects'
import styles from '../styles/CVMain.module.css'

function CVMain({ personal, summary, experience, projects }) {
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
  const isEmpty = !summary && experience.length === 0 && projects.length === 0

  return (
    <main className={styles.main}>
      <MainHeader fullName={fullName} jobTitle={personal.jobTitle} />

      {summary && (
        <section>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <p className={styles.summaryText}>{summary}</p>
        </section>
      )}

      <MainExperience experience={experience} />
      <MainProjects projects={projects} />

      {isEmpty && (
        <div className={styles.emptyHint}>
          <p>Fill in the form on the left to build your CV ✨</p>
        </div>
      )}
    </main>
  )
}

CVMain.propTypes = {
  personal: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    jobTitle: PropTypes.string,
  }).isRequired,
  summary: PropTypes.string.isRequired,
  experience: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default CVMain
