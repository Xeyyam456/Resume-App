import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import styles from '../styles/MonochromeMain.module.css'

function MonochromeMain({ summary, experience, projects }) {
  const isEmpty = !summary && experience.length === 0 && projects.length === 0

  return (
    <div className={styles.main}>
      {summary && (
        <section className={styles.mBlock}>
          <h2 className={styles.mHeading}>Profile</h2>
          <p className={styles.summary}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.mBlock}>
          <h2 className={styles.mHeading}>Work Experience</h2>
          {experience.map(exp => {
            const startDate = formatDate(exp.startDate)
            const endDate = exp.current ? 'Present' : formatDate(exp.endDate)
            const dateRange = [startDate, endDate].filter(Boolean).join(' – ')
            return (
              <div key={exp.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <span className={styles.entryTitle}>{exp.position}</span>
                  {dateRange && <span className={styles.entryDate}>{dateRange}</span>}
                </div>
                {exp.company && <div className={styles.entrySub}>{exp.company}</div>}
                {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
              </div>
            )
          })}
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.mBlock}>
          <h2 className={styles.mHeading}>Projects</h2>
          {projects.map(project => (
            <div key={project.id} className={styles.entry}>
              <div className={styles.entryHeader}>
                <span className={styles.entryTitle}>{project.name}</span>
                {project.link && <span className={styles.entryDate}>{project.link}</span>}
              </div>
              {project.description && <div className={styles.entryDesc}>{project.description}</div>}
            </div>
          ))}
        </section>
      )}

      {isEmpty && (
        <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
      )}
    </div>
  )
}

MonochromeMain.propTypes = {
  summary: PropTypes.string.isRequired,
  experience: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default MonochromeMain
