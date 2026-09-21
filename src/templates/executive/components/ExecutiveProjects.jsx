import PropTypes from 'prop-types'
import GoldHeading from './GoldHeading'
import styles from '../styles/ExecutiveProjects.module.css'

function ExecutiveProjects({ projects }) {
  if (projects.length === 0) return null

  return (
    <section className={styles.block}>
      <GoldHeading>Projects</GoldHeading>
      {projects.map(project => (
        <div key={project.id} className={styles.entry}>
          <div className={styles.entryTitle}>{project.name}</div>
          {project.description && <div className={styles.entryDesc}>{project.description}</div>}
        </div>
      ))}
    </section>
  )
}

ExecutiveProjects.propTypes = {
  projects: PropTypes.array.isRequired,
}

export default ExecutiveProjects
