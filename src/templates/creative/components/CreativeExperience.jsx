import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import CreativeHeading from './CreativeHeading'
import styles from '../styles/CreativeExperience.module.css'

function CreativeExperience({ experience }) {
  if (experience.length === 0) return null

  return (
    <section className={styles.block}>
      <CreativeHeading>Experience</CreativeHeading>
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
  )
}

CreativeExperience.propTypes = {
  experience: PropTypes.array.isRequired,
}

export default CreativeExperience
