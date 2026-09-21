import PropTypes from 'prop-types'
import FormTextarea from '@/shared/components/FormTextarea'
import SectionCard from '@/shared/components/SectionCard'

function SummarySection({ summary, onUpdate }) {
  return (
    <SectionCard icon="📝" title="Professional Summary">
      <FormTextarea
        label="Write a compelling summary about yourself"
        id="summary"
        value={summary}
        onChange={onUpdate}
        placeholder="Passionate software engineer with 5+ years of experience building scalable web applications. Enthusiastic about clean code and user-centered design..."
        rows={5}
      />
    </SectionCard>
  )
}

SummarySection.propTypes = {
  summary: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default SummarySection
