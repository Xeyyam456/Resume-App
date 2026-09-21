import PropTypes from 'prop-types'
import EntryCard from '@/shared/components/EntryCard'
import FormInput from '@/shared/components/FormInput'
import FormTextarea from '@/shared/components/FormTextarea'
import styles from '../styles/ProjectsEntry.module.css'

function ProjectsEntry({ project, onUpdate, onRemove }) {
  return (
    <EntryCard title={project.name || 'New Project'} onRemove={onRemove}>
      <div className={`${styles.grid} ${styles.grid2}`}>
        <FormInput
          label="Project Name"
          id={`proj-name-${project.id}`}
          value={project.name}
          onChange={val => onUpdate(project.id, 'name', val)}
          placeholder="My Awesome Project"
          required
        />
        <FormInput
          label="Link / GitHub URL"
          id={`proj-link-${project.id}`}
          value={project.link}
          onChange={val => onUpdate(project.id, 'link', val)}
          placeholder="github.com/user/project"
        />
      </div>
      <FormTextarea
        label="Description"
        id={`proj-desc-${project.id}`}
        value={project.description}
        onChange={val => onUpdate(project.id, 'description', val)}
        placeholder="Briefly describe the project, your role, and its impact…"
        rows={3}
      />
      <FormInput
        label="Technologies Used"
        id={`proj-tech-${project.id}`}
        value={project.technologies}
        onChange={val => onUpdate(project.id, 'technologies', val)}
        placeholder="React, Node.js, MongoDB, Docker"
      />
    </EntryCard>
  )
}

ProjectsEntry.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default ProjectsEntry
