import PropTypes from 'prop-types'
import styles from './CVMain.module.css'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

function CVMain({ personal, summary, experience, projects }) {
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')

  return (
    <main className={styles.main}>
      <div className={styles.nameSection}>
        <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
        {personal.jobTitle && (
          <div className={styles.jobTitle}>{personal.jobTitle}</div>
        )}
      </div>

      {summary && (
        <section>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <p className={styles.summaryText}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div className={styles.timeline}>
          {experience.map(exp => {
            const startDate = formatDate(exp.startDate)
            const endDate = exp.current ? 'Present' : formatDate(exp.endDate)
            const dateRange = [startDate, endDate].filter(Boolean).join(' – ')
            return (
              <div key={exp.id} className={styles.expItem}>
                <div className={styles.expHeader}>
                  <div className={styles.expPosition}>{exp.position}</div>
                  {dateRange && <div className={styles.expDate}>{dateRange}</div>}
                </div>
                {exp.company && (
                  <div className={styles.expCompany}>{exp.company}</div>
                )}
                {exp.description && (
                  <div className={styles.expDescription}>{exp.description}</div>
                )}
              </div>
            )
          })}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {projects.map(project => (
            <div key={project.id} className={styles.projectItem}>
              <div className={styles.projectHeader}>
                <div className={styles.projectName}>{project.name}</div>
                {project.link && (
                  <span className={styles.projectLink}>{project.link}</span>
                )}
              </div>
              {project.description && (
                <div className={styles.projectDescription}>{project.description}</div>
              )}
              {project.technologies && (
                <div className={styles.techList}>
                  {project.technologies.split(',').map(t => t.trim()).filter(Boolean).map((tech, i) => (
                    <span key={i} className={styles.techChip}>{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {!summary && experience.length === 0 && projects.length === 0 && (
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
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.string,
      position: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      current: PropTypes.bool,
      description: PropTypes.string,
    })
  ).isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      technologies: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
}

export default CVMain
