import PropTypes from 'prop-types'
import styles from './BannerTemplate.module.css'

function BannerTimeline({ timeline, projects }) {
  return (
    <div className={styles.right}>
      {timeline.length > 0 ? (
        <div className={styles.timeline}>
          {timeline.map(item => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineTitle}>{item.title}</span>
                {item.date && <span className={styles.timelineDate}>{item.date}</span>}
              </div>
              {item.sub && <div className={styles.timelineSub}>{item.sub}</div>}
              {item.desc && <div className={styles.timelineDesc}>{item.desc}</div>}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyHint}>Fill in the form on the left to build your CV ✨</div>
      )}

      {projects.length > 0 && (
        <div className={styles.projectsBlock}>
          <h3 className={styles.rightHeading}>Projects</h3>
          {projects.map(project => (
            <div key={project.id} className={styles.projectItem}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineTitle}>{project.name}</span>
                {project.link && <span className={styles.timelineDate}>{project.link}</span>}
              </div>
              {project.description && <div className={styles.timelineDesc}>{project.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

BannerTimeline.propTypes = {
  timeline: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}

export default BannerTimeline
