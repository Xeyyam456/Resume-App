import PropTypes from 'prop-types'
import EntryCard from '@/shared/components/EntryCard'
import FormInput from '@/shared/components/FormInput'
import FormSelect from '@/shared/components/FormSelect'
import { SKILL_LEVEL_OPTIONS } from '@/utils/constants'
import styles from '../styles/SkillsEntry.module.css'

function SkillsEntry({ skill, onUpdate, onRemove }) {
  const title = skill.name ? `${skill.name} — ${skill.level}` : 'New Skill'

  return (
    <EntryCard title={title} onRemove={onRemove}>
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
  )
}

SkillsEntry.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default SkillsEntry
