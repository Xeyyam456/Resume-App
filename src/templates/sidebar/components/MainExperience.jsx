import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import styles from '../styles/MainExperience.module.css'

function MainExperience({ experience }) {
  if (experience.length === 0) return null

  return (
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
              {exp.company && <div className={styles.expCompany}>{exp.company}</div>}
              {exp.description && <div className={styles.expDescription}>{exp.description}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

MainExperience.propTypes = {
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
}

export default MainExperience
