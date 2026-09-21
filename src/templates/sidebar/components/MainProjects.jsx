import PropTypes from 'prop-types'
import styles from '../styles/MainProjects.module.css'

function MainProjects({ projects }) {
  if (projects.length === 0) return null

  return (
    <section>
      <h2 className={styles.sectionTitle}>Projects</h2>
      {projects.map(project => (
        <div key={project.id} className={styles.projectItem}>
          <div className={styles.projectHeader}>
            <div className={styles.projectName}>{project.name}</div>
            {project.link && <span className={styles.projectLink}>{project.link}</span>}
          </div>
          {project.description && <div className={styles.projectDescription}>{project.description}</div>}
          {project.technologies && (
            <div className={styles.techList}>
              {project.technologies.split(',').map(t => t.trim()).filter(Boolean).map((tech, i) => (
                <span key={i} className={styles.techChip}>{tech}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}

MainProjects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      technologies: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
}

export default MainProjects
