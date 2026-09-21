import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import CreativeHeading from './CreativeHeading'
import styles from './CreativeTemplate.module.css'

const RANK_PERCENT = { 1: 55, 2: 68, 3: 80, 4: 90, 5: 98 }

function CreativeSkillRings({ skills }) {
  if (skills.length === 0) return null

  return (
    <section className={styles.block}>
      <CreativeHeading>Skills</CreativeHeading>
      <div className={styles.ringsRow}>
        {skills.map(skill => {
          const rank = SKILL_LEVEL_RANKS[skill.level] ?? 3
          const pct = RANK_PERCENT[rank] ?? 80
          return (
            <div key={skill.id} className={styles.ringWrap}>
              <div className={styles.ring} style={{ '--pct': pct }}>
                <div className={styles.ringInner}>{pct}%</div>
              </div>
              <span className={styles.ringLabel}>{skill.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

CreativeSkillRings.propTypes = {
  skills: PropTypes.array.isRequired,
}

export default CreativeSkillRings
