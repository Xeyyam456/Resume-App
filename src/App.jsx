import { useState, useCallback } from 'react'
import ResumeForm from '@/components/form/ResumeForm'
import ResumePreview from '@/components/preview/ResumePreview'
import Button from '@/components/ui/Button'
import './App.css'

const generateId = () => Math.random().toString(36).substr(2, 9)

const initialResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

function App() {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [activeTab, setActiveTab] = useState('form')

  /* ─── Personal & Summary ─── */
  const updatePersonal = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }, [])

  const updateSummary = useCallback((value) => {
    setResumeData(prev => ({ ...prev, summary: value }))
  }, [])

  /* ─── Experience ─── */
  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: generateId(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
      ],
    }))
  }, [])

  const updateExperience = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }, [])

  const removeExperience = useCallback((id) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }))
  }, [])

  /* ─── Education ─── */
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: generateId(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
      ],
    }))
  }, [])

  const updateEducation = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }, [])

  const removeEducation = useCallback((id) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }))
  }, [])

  /* ─── Skills ─── */
  const addSkill = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: generateId(), name: '', level: 'Intermediate' }],
    }))
  }, [])

  const updateSkill = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }, [])

  const removeSkill = useCallback((id) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }))
  }, [])

  /* ─── Projects ─── */
  const addProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: generateId(), name: '', description: '', technologies: '', link: '' },
      ],
    }))
  }, [])

  const updateProject = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }, [])

  const removeProject = useCallback((id) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(proj => proj.id !== id) }))
  }, [])

  const handlers = {
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
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__logo">
          <span className="app-header__icon">📄</span>
          <span className="app-header__title">Resume Builder</span>
        </div>
        <nav className="app-header__tabs">
          <Button
            variant="ghost"
            size="sm"
            active={activeTab === 'form'}
            onClick={() => setActiveTab('form')}
          >
            ✏️ Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            active={activeTab === 'preview'}
            onClick={() => setActiveTab('preview')}
          >
            👁 Preview
          </Button>
        </nav>
      </header>

      <main className="app-main">
        <div className={`app-panel app-panel--form ${activeTab === 'form' ? 'app-panel--active' : ''}`}>
          <ResumeForm resumeData={resumeData} handlers={handlers} />
        </div>
        <div className={`app-panel app-panel--preview ${activeTab === 'preview' ? 'app-panel--active' : ''}`}>
          <ResumePreview resumeData={resumeData} />
        </div>
      </main>
    </div>
  )
}

export default App
