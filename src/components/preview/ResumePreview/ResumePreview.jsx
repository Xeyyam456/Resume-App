import PropTypes from 'prop-types'
import { getTemplate } from '@/templates'
import TemplatePicker from '@/components/preview/TemplatePicker'
import Button from '@/shared/components/Button'
import styles from './ResumePreview.module.css'

function ResumePreview({ resumeData, templateId, onTemplateChange }) {
  const handlePrint = () => window.print()
  const { Component: Template } = getTemplate(templateId)

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <TemplatePicker selectedId={templateId} onSelect={onTemplateChange} />
        <Button variant="primary" size="sm" onClick={handlePrint}>
          🖨 Download / Print PDF
        </Button>
      </div>

      <div className={styles.cv} id="cv-document">
        <Template resumeData={resumeData} />
      </div>
    </div>
  )
}

ResumePreview.propTypes = {
  resumeData: PropTypes.shape({
    personal: PropTypes.object.isRequired,
    summary: PropTypes.string.isRequired,
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
  }).isRequired,
  templateId: PropTypes.string.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
}

export default ResumePreview
