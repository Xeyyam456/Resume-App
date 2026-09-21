import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import GoldHeading from './GoldHeading'
import styles from '../styles/ExecutiveExperience.module.css'

function ExecutiveExperience({ experience }) {
  if (experience.length === 0) return null

  return (
    <section className={styles.block}>
      <GoldHeading>Experience</GoldHeading>
      {experience.map(exp => {
        const dateRange = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ')
        return (
          <div key={exp.id} className={styles.entry}>
            <div className={styles.entryTitle}>{exp.position}</div>
            <div className={styles.entrySub}>{exp.company}{dateRange ? ` · ${dateRange}` : ''}</div>
            {exp.description && <div className={styles.entryDesc}>{exp.description}</div>}
          </div>
        )
      })}
    </section>
  )
}

ExecutiveExperience.propTypes = {
  experience: PropTypes.array.isRequired,
}

export default ExecutiveExperience
