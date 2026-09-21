import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import styles from '../styles/EditorialRight.module.css'

function EditorialRight({ fullName, jobTitle, summary, experience, education }) {
  return (
    <div className={styles.right}>
      <div className={styles.nameZone}>
        <h1 className={styles.name}>{fullName || 'Your Name'}</h1>
        {jobTitle && <div className={styles.jobTitle}>{jobTitle}</div>}
      </div>

      <div className={styles.card}>
        {summary && (
          <section className={styles.block}>
            <h2 className={styles.heading}>Profile</h2>
            <p className={styles.summary}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.block}>
            <h2 className={styles.heading}>Experience</h2>
            {experience.map(exp => {
              const dateRange = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ')
              return (
                <div key={exp.id} className={styles.entry}>
                  <span className={styles.bullet} />
                  <div className={styles.entryBody}>
                    <div className={styles.entryHeader}>
                      <span className={styles.entryTitle}>{exp.position}</span>
                      {dateRange && <span className={styles.entryDate}>{dateRange}</span>}
                    </div>
                    <div className={styles.entrySub}>{exp.company}</div>
                    {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
                  </div>
                </div>
              )
            })}
          </section>
        )}

        {education.length > 0 && (
          <section className={styles.block}>
            <h2 className={styles.heading}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className={styles.entry}>
                <span className={styles.bullet} />
                <div className={styles.entryBody}>
                  <div className={styles.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className={styles.entrySub}>{edu.school}</div>
                </div>
              </div>
            ))}
          </section>
        )}

        {!summary && experience.length === 0 && education.length === 0 && (
          <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
        )}
      </div>
    </div>
  )
}

EditorialRight.propTypes = {
  fullName: PropTypes.string,
  jobTitle: PropTypes.string,
  summary: PropTypes.string,
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
}

export default EditorialRight
