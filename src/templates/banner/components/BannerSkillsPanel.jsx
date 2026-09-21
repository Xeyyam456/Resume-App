import PropTypes from 'prop-types'
import { SKILL_LEVEL_RANKS } from '@/utils/constants'
import styles from '../styles/BannerSkillsPanel.module.css'

function BannerSkillsPanel({ summary, skills }) {
  return (
    <div className={styles.left}>
      {summary && (
        <div className={styles.leftBlock}>
          <h3 className={styles.leftHeading}>Profile</h3>
          <p className={styles.summary}>{summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className={styles.leftBlock}>
          <h3 className={styles.leftHeading}>Skills</h3>
          <div className={styles.skillList}>
            {skills.map(skill => {
              const rank = SKILL_LEVEL_RANKS[skill.level] ?? 3
              return (
                <div key={skill.id} className={styles.skillRow}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <div className={styles.slider}>
                    <div className={styles.sliderTrack} />
                    <div className={styles.sliderKnob} style={{ left: `${rank * 18}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

BannerSkillsPanel.propTypes = {
  summary: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
}

export default BannerSkillsPanel
