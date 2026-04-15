import { useState } from 'react'
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

  const addItem = (key, template) => {
    setResumeData(prev => ({
      ...prev,
      [key]: [...prev[key], { id: crypto.randomUUID(), ...template }],
    }))
  }

  const updateItem = (key, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [key]: prev[key].map(item => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const removeItem = (key, id) => {
    setResumeData(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item.id !== id),
    }))
  }

  const handlers = {
    updatePersonal,
    updateSummary,
    addExperience:    () => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' }),
    updateExperience: (id, field, value) => updateItem('experience', id, field, value),
    removeExperience: (id) => removeItem('experience', id),
    addEducation:     () => addItem('education', { school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }),
    updateEducation:  (id, field, value) => updateItem('education', id, field, value),
    removeEducation:  (id) => removeItem('education', id),
    addSkill:         () => addItem('skills', { name: '', level: 'Intermediate' }),
    updateSkill:      (id, field, value) => updateItem('skills', id, field, value),
    removeSkill:      (id) => removeItem('skills', id),
    addProject:       () => addItem('projects', { name: '', description: '', technologies: '', link: '' }),
    updateProject:    (id, field, value) => updateItem('projects', id, field, value),
    removeProject:    (id) => removeItem('projects', id),
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
