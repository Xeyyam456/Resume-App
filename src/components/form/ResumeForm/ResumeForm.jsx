import PropTypes from 'prop-types'
import PersonalInfoSection from '@/components/form/PersonalInfoSection'
import SummarySection from '@/components/form/SummarySection'
import ExperienceSection from '@/components/form/ExperienceSection'
import EducationSection from '@/components/form/EducationSection'
import SkillsSection from '@/components/form/SkillsSection'
import ProjectsSection from '@/components/form/ProjectsSection'
import styles from './ResumeForm.module.css'

function ResumeForm({ resumeData, handlers }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const {
    updatePersonal,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
  } = handlers

  return (
    <form className={styles.panel} onSubmit={e => e.preventDefault()}>
      <PersonalInfoSection personal={personal} onUpdate={updatePersonal} />
      <SummarySection summary={summary} onUpdate={updateSummary} />
      <ExperienceSection
        experiences={experience}
        onAdd={addExperience}
        onUpdate={updateExperience}
        onRemove={removeExperience}
      />
      <EducationSection
        educations={education}
        onAdd={addEducation}
        onUpdate={updateEducation}
        onRemove={removeEducation}
      />
      <SkillsSection
        skills={skills}
        onAdd={addSkill}
        onUpdate={updateSkill}
        onRemove={removeSkill}
      />
      <ProjectsSection
        projects={projects}
        onAdd={addProject}
        onUpdate={updateProject}
        onRemove={removeProject}
      />
    </form>
  )
}

ResumeForm.propTypes = {
  resumeData: PropTypes.shape({
    personal: PropTypes.object.isRequired,
    summary: PropTypes.string.isRequired,
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
  }).isRequired,
  handlers: PropTypes.shape({
    updatePersonal: PropTypes.func.isRequired,
    updateSummary: PropTypes.func.isRequired,
    addExperience: PropTypes.func.isRequired,
    updateExperience: PropTypes.func.isRequired,
    removeExperience: PropTypes.func.isRequired,
    addEducation: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    removeEducation: PropTypes.func.isRequired,
    addSkill: PropTypes.func.isRequired,
    updateSkill: PropTypes.func.isRequired,
    removeSkill: PropTypes.func.isRequired,
    addProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    removeProject: PropTypes.func.isRequired,
  }).isRequired,
}

export default ResumeForm
