import PropTypes from 'prop-types'
import EntryCard from '@/shared/components/EntryCard'
import FormInput from '@/shared/components/FormInput'
import FormSelect from '@/shared/components/FormSelect'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import styles from './EducationSection.module.css'

const DEGREE_OPTIONS = [
  { value: '', label: 'Select degree…' },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: 'PhD', label: 'PhD / Doctorate' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'High School', label: 'High School' },
]

function EducationSection({ educations, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="🎓" title="Education">
      <div className={styles.entries}>
        {educations.map(edu => (
          <EntryCard
            key={edu.id}
            title={
              edu.school
                ? edu.degree
                  ? `${edu.school} — ${edu.degree}`
                  : edu.school
                : 'New Education'
            }
            onRemove={() => onRemove(edu.id)}
          >
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
