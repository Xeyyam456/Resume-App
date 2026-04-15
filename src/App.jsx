import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ResumeForm from '@/components/form/ResumeForm'
import ResumePreview from '@/components/preview/ResumePreview'
import Button from '@/components/ui/Button'
import './App.css'

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
    photo: '',
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

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
      ],
    }))
  }

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: uuidv4(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
      ],
    }))
  }

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }))
  }

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: uuidv4(), name: '', level: 'Intermediate' }],
    }))
  }

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkill = (id) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }))
  }

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: uuidv4(), name: '', description: '', technologies: '', link: '' },
      ],
    }))
  }

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const removeProject = (id) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(proj => proj.id !== id) }))
  }

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
