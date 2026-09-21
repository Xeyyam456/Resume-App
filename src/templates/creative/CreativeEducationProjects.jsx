import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import CreativeHeading from './CreativeHeading'
import styles from './CreativeTemplate.module.css'

function CreativeEducationProjects({ education, projects }) {
  if (education.length === 0 && projects.length === 0) return null

  return (
    <div className={styles.pairGrid}>
      {education.length > 0 && (
        <section className={styles.block}>
          <CreativeHeading>Education</CreativeHeading>
          <div className={styles.timeline}>
            {education.map(edu => {
              const dateRange = [formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – ')
              return (
                <div key={edu.id} className={styles.timelineItem}>
                  {dateRange && <div className={styles.timelineDate}>{dateRange}</div>}
                  <div className={styles.eduDegree}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className={styles.eduSchool}>{edu.school}</div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.block}>
          <CreativeHeading>Projects</CreativeHeading>
          <div className={styles.projectList}>
            {projects.map(project => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectName}>{project.name}</div>
                {project.description && <div className={styles.projectDesc}>{project.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

CreativeEducationProjects.propTypes = {
  education: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default CreativeEducationProjects
