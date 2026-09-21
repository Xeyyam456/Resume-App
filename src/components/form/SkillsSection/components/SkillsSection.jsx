import PropTypes from 'prop-types'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import SkillsEntry from './SkillsEntry'
import styles from '../styles/SkillsSection.module.css'

function SkillsSection({ skills, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="⚡" title="Skills">
      <div className={styles.entries}>
        {skills.map(skill => (
          <SkillsEntry key={skill.id} skill={skill} onUpdate={onUpdate} onRemove={() => onRemove(skill.id)} />
        ))}
      </div>

      <Button variant="dashed" fullWidth onClick={onAdd}>
        <span>＋</span> Add Skill
      </Button>
    </SectionCard>
  )
}

SkillsSection.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default SkillsSection
