import PropTypes from 'prop-types'
import EntryCard from '@/components/ui/EntryCard'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import SectionCard from '@/components/ui/SectionCard'
import Button from '@/components/ui/Button'
import styles from './ProjectsSection.module.css'

function ProjectsSection({ projects, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="🚀" title="Projects">
      <div className={styles.entries}>
        {projects.map(project => (
          <EntryCard
            key={project.id}
            title={project.name || 'New Project'}
            onRemove={() => onRemove(project.id)}
          >
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
