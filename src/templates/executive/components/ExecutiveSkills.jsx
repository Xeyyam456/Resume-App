import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import GoldHeading from './GoldHeading'
import styles from '../styles/ExecutiveSkills.module.css'

function ExecutiveSkills({ skills }) {
  if (skills.length === 0) return null

  return (
    <section className={styles.block}>
      <GoldHeading>Skills</GoldHeading>
      <div className={styles.skillList}>
        {skills.map(skill => {
          const rank = SKILL_LEVEL_RANKS[skill.level] ?? 3
          return (
            <div key={skill.id} className={styles.skillRow}>
              <span className={styles.skillName}>{skill.name}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${rank * 20}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

ExecutiveSkills.propTypes = {
  skills: PropTypes.array.isRequired,
}

export default ExecutiveSkills
