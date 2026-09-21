import PropTypes from 'prop-types'
import EntryCard from '@/shared/components/EntryCard'
import FormInput from '@/shared/components/FormInput'
import FormSelect from '@/shared/components/FormSelect'
import { DEGREE_OPTIONS } from '../constants/degreeOptions'
import styles from '../styles/EducationEntry.module.css'

function EducationEntry({ edu, onUpdate, onRemove }) {
  const title = edu.school
    ? edu.degree
      ? `${edu.school} — ${edu.degree}`
      : edu.school
    : 'New Education'

  return (
    <EntryCard title={title} onRemove={onRemove}>
      <div className={`${styles.grid} ${styles.grid2}`}>
        <FormInput
          label="School / University"
          id={`edu-school-${edu.id}`}
          value={edu.school}
          onChange={val => onUpdate(edu.id, 'school', val)}
          placeholder="MIT"
          required
        />
        <FormSelect
          label="Degree"
          id={`edu-degree-${edu.id}`}
          value={edu.degree}
          onChange={val => onUpdate(edu.id, 'degree', val)}
          options={DEGREE_OPTIONS}
        />
        <FormInput
          label="Field of Study"
          id={`edu-field-${edu.id}`}
          value={edu.field}
          onChange={val => onUpdate(edu.id, 'field', val)}
          placeholder="Computer Science"
        />
        <FormInput
          label="GPA (optional)"
          id={`edu-gpa-${edu.id}`}
          value={edu.gpa}
          onChange={val => onUpdate(edu.id, 'gpa', val)}
          placeholder="3.8 / 4.0"
        />
        <FormInput
          label="Start Date"
          id={`edu-start-${edu.id}`}
          type="month"
          value={edu.startDate}
          onChange={val => onUpdate(edu.id, 'startDate', val)}
        />
        <FormInput
          label="End Date"
          id={`edu-end-${edu.id}`}
          type="month"
          value={edu.endDate}
          onChange={val => onUpdate(edu.id, 'endDate', val)}
        />
      </div>
    </EntryCard>
  )
}

EducationEntry.propTypes = {
  edu: PropTypes.shape({
    id: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    gpa: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default EducationEntry
