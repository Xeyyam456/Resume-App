import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import GoldHeading from './GoldHeading'
import styles from '../styles/ExecutiveEducation.module.css'

function ExecutiveEducation({ education }) {
  if (education.length === 0) return null

  return (
    <section className={styles.block}>
      <GoldHeading>Education</GoldHeading>
      {education.map(edu => (
        <div key={edu.id} className={styles.entry}>
          <div className={styles.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
          <div className={styles.entrySub}>{edu.school}</div>
          {(edu.startDate || edu.endDate) && (
            <div className={styles.entryDate}>{[formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – ')}</div>
          )}
        </div>
      ))}
    </section>
  )
}

ExecutiveEducation.propTypes = {
  education: PropTypes.array.isRequired,
}

export default ExecutiveEducation
