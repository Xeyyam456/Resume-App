import PropTypes from 'prop-types'
import EntryCard from '@/components/ui/EntryCard'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import SectionCard from '@/components/ui/SectionCard'
import Button from '@/components/ui/Button'
import styles from './SkillsSection.module.css'

const LEVEL_OPTIONS = [
  { value: 'Beginner', label: '🔵 Beginner' },
  { value: 'Elementary', label: '🟢 Elementary' },
  { value: 'Intermediate', label: '🟡 Intermediate' },
  { value: 'Advanced', label: '🟠 Advanced' },
  { value: 'Expert', label: '🔴 Expert' },
]

function SkillsSection({ skills, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="⚡" title="Skills">
      <div className={styles.entries}>
        {skills.map(skill => (
          <EntryCard
            key={skill.id}
            title={skill.name ? `${skill.name} — ${skill.level}` : 'New Skill'}
            onRemove={() => onRemove(skill.id)}
          >
            <div className={`${styles.grid} ${styles.grid2}`}>
              <FormInput
                label="Skill Name"
                id={`skill-name-${skill.id}`}
                value={skill.name}
                onChange={val => onUpdate(skill.id, 'name', val)}
                placeholder="React, Python, Figma…"
                required
              />
              <FormSelect
                label="Proficiency Level"
                id={`skill-level-${skill.id}`}
                value={skill.level}
                onChange={val => onUpdate(skill.id, 'level', val)}
                options={LEVEL_OPTIONS}
              />
            </div>
          </EntryCard>
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
