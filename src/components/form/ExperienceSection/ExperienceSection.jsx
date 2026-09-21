import PropTypes from 'prop-types'
import EntryCard from '@/shared/components/EntryCard'
import FormInput from '@/shared/components/FormInput'
import FormTextarea from '@/shared/components/FormTextarea'
import SectionCard from '@/shared/components/SectionCard'
import Button from '@/shared/components/Button'
import styles from './ExperienceSection.module.css'

function ExperienceSection({ experiences, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="💼" title="Work Experience">
      <div className={styles.entries}>
        {experiences.map(exp => (
          <EntryCard
            key={exp.id}
            title={
              exp.position && exp.company
                ? `${exp.position} @ ${exp.company}`
                : exp.position || exp.company || 'New Experience'
            }
            onRemove={() => onRemove(exp.id)}
          >
            <div className={`${styles.grid} ${styles.grid2}`}>
              <FormInput
                label="Job Title / Position"
                id={`exp-position-${exp.id}`}
                value={exp.position}
                onChange={val => onUpdate(exp.id, 'position', val)}
                placeholder="Senior Software Engineer"
                required
              />
              <FormInput
                label="Company"
                id={`exp-company-${exp.id}`}
                value={exp.company}
                onChange={val => onUpdate(exp.id, 'company', val)}
                placeholder="Google Inc."
                required
              />
              <FormInput
                label="Start Date"
                id={`exp-start-${exp.id}`}
                type="month"
                value={exp.startDate}
                onChange={val => onUpdate(exp.id, 'startDate', val)}
              />
              <div>
                <div className={styles.endDateLabel}>End Date</div>
                {exp.current ? (
                  <div className={styles.inputDisabled}>Present</div>
                ) : (
                  <input
                    className={styles.endDateInput}
                    type="month"
                    id={`exp-end-${exp.id}`}
                    value={exp.endDate}
                    onChange={e => onUpdate(exp.id, 'endDate', e.target.value)}
                  />
                )}
              </div>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id={`exp-current-${exp.id}`}
                checked={exp.current}
                onChange={e => {
                  onUpdate(exp.id, 'current', e.target.checked)
                  if (e.target.checked) onUpdate(exp.id, 'endDate', '')
                }}
              />
              <label className={styles.checkboxLabel} htmlFor={`exp-current-${exp.id}`}>
                I currently work here
              </label>
            </div>

            <FormTextarea
              label="Description / Key Achievements"
              id={`exp-desc-${exp.id}`}
              value={exp.description}
              onChange={val => onUpdate(exp.id, 'description', val)}
              placeholder={'• Led the development of core product features\n• Improved system performance by 40%\n• Mentored junior team members'}
              rows={4}
            />
          </EntryCard>
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
