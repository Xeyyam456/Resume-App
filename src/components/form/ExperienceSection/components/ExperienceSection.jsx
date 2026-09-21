import PropTypes from 'prop-types'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import ExperienceEntry from './ExperienceEntry'
import styles from '../styles/ExperienceSection.module.css'

function ExperienceSection({ experiences, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="💼" title="Work Experience">
      <div className={styles.entries}>
        {experiences.map(exp => (
          <ExperienceEntry key={exp.id} exp={exp} onUpdate={onUpdate} onRemove={() => onRemove(exp.id)} />
        ))}
      </div>

      <Button variant="dashed" fullWidth onClick={onAdd}>
        <span>＋</span> Add Experience
      </Button>
    </SectionCard>
  )
}

ExperienceSection.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      current: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default ExperienceSection
