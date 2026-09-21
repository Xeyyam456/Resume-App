import PropTypes from 'prop-types'
import { formatDate } from '@/utils/formatDate'
import styles from './CVSidebar.module.css'

function SidebarEducation({ education }) {
  if (education.length === 0) return null

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>Education</div>
      {education.map(edu => {
        const dateRange = [formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – ')
        return (
          <div key={edu.id} className={styles.eduItem}>
            <div className={styles.eduDegree}>
              {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
            </div>
            <div className={styles.eduSchool}>{edu.school}</div>
            {dateRange && <div className={styles.eduDate}>{dateRange}</div>}
            {edu.gpa && <div className={styles.eduDate}>GPA: {edu.gpa}</div>}
          </div>
        )
      })}
    </div>
  )
}

SidebarEducation.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      school: PropTypes.string,
      degree: PropTypes.string,
      field: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      gpa: PropTypes.string,
    })
  ).isRequired,
}

export default SidebarEducation
