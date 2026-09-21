import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import styles from './CVSidebar.module.css'

function SidebarSkills({ skills }) {
  if (skills.length === 0) return null

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>Skills</div>
      <div className={styles.skillList}>
        {skills.map(skill => {
          const rank = SKILL_LEVEL_RANKS[skill.level] ?? 3
          return (
            <div key={skill.id} className={styles.skill}>
              <span className={styles.skillName}>{skill.name}</span>
              <div className={styles.skillTicks} role="img" aria-label={skill.level}>
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`${styles.tick} ${i <= rank ? styles.tickFilled : ''}`} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SidebarSkills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default SidebarSkills
