import PropTypes from 'prop-types'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import EducationEntry from './EducationEntry'
import styles from '../styles/EducationSection.module.css'

function EducationSection({ educations, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="🎓" title="Education">
      <div className={styles.entries}>
        {educations.map(edu => (
          <EducationEntry key={edu.id} edu={edu} onUpdate={onUpdate} onRemove={() => onRemove(edu.id)} />
        ))}
      </div>

      <Button variant="dashed" fullWidth onClick={onAdd}>
        <span>＋</span> Add Education
      </Button>
    </SectionCard>
  )
}

EducationSection.propTypes = {
  educations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      gpa: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default EducationSection
