import PropTypes from 'prop-types'
import CVSidebar from '@/components/preview/CVSidebar'
import CVMain from '@/components/preview/CVMain'
import Button from '@/components/ui/Button'
import styles from './ResumePreview.module.css'

function ResumePreview({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData

  const handlePrint = () => window.print()

  return (
    <div className={styles.wrapper}>
      <div className={styles.printBar}>
        <Button variant="primary" size="sm" onClick={handlePrint}>
          🖨 Download / Print PDF
        </Button>
      </div>

      <div className={styles.cv} id="cv-document">
        <CVSidebar personal={personal} skills={skills} education={education} />
        <CVMain
          personal={personal}
          summary={summary}
          experience={experience}
          projects={projects}
        />
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
}

export default ResumePreview
