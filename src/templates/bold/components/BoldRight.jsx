import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import DarkHeading from './DarkHeading'
import styles from '../styles/BoldRight.module.css'

function BoldRight({ firstName, lastName, jobTitle, summary, experience, projects }) {
  return (
    <div className={styles.right}>
      <div className={styles.nameBlock}>
        <h1 className={styles.name}>
          <span className={styles.nameFirst}>{firstName || 'Your'}</span>{' '}
          <span className={styles.nameLast}>{lastName || 'Name'}</span>
        </h1>
        {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}
      </div>

      {summary && (
        <section className={styles.block}>
          <DarkHeading>About Me</DarkHeading>
          <p className={styles.summary}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.block}>
          <DarkHeading>Experience</DarkHeading>
          <div className={styles.timeline}>
            {experience.map(exp => {
              const dateRange = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ')
              return (
                <div key={exp.id} className={styles.timelineItem}>
                  <div className={styles.entryHeader}>
                    <span className={styles.entryTitle}>{exp.position}</span>
                    {dateRange && <span className={styles.entryDate}>{dateRange}</span>}
                  </div>
                  <div className={styles.entrySub}>{exp.company}</div>
                  {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {!summary && experience.length === 0 && (
        <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
      )}

      {projects.length > 0 && (
        <section className={styles.block}>
          <DarkHeading>Projects</DarkHeading>
          {projects.map(project => (
            <div key={project.id} className={styles.projectItem}>
              <div className={styles.entryTitle}>{project.name}</div>
              {project.description && <div className={styles.entryDesc}>{project.description}</div>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

BoldRight.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  jobTitle: PropTypes.string,
  summary: PropTypes.string,
  experience: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default BoldRight
