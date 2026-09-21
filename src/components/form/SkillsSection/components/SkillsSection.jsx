import PropTypes from 'prop-types'
import EntryCard from '@/shared/components/EntryCard'
import FormInput from '@/shared/components/FormInput'
import FormSelect from '@/shared/components/FormSelect'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import { SKILL_LEVEL_OPTIONS } from '@/utils/constants'
import styles from './SkillsSection.module.css'

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
                options={SKILL_LEVEL_OPTIONS}
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
