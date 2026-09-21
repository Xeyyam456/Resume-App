import PropTypes from 'prop-types'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import ProjectsEntry from './ProjectsEntry'
import styles from '../styles/ProjectsSection.module.css'

function ProjectsSection({ projects, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="🚀" title="Projects">
      <div className={styles.entries}>
        {projects.map(project => (
          <ProjectsEntry key={project.id} project={project} onUpdate={onUpdate} onRemove={() => onRemove(project.id)} />
        ))}
      </div>

      <Button variant="dashed" fullWidth onClick={onAdd}>
        <span>＋</span> Add Project
      </Button>
    </SectionCard>
  )
}

ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      technologies: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default ProjectsSection
