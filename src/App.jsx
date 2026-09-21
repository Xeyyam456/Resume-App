import { useState } from 'react'
import ResumeForm from '@/components/form/ResumeForm'
import ResumePreview from '@/components/preview/ResumePreview'
import Button from '@/shared/components/Button'
import { useResumeData } from '@/hooks/useResumeData'
import { DEFAULT_TEMPLATE_ID } from '@/templates'
import './App.css'

function App() {
  const { resumeData, handlers } = useResumeData()
  const [activeTab, setActiveTab] = useState('form')
  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE_ID)

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
          <ResumePreview resumeData={resumeData} templateId={templateId} onTemplateChange={setTemplateId} />
        </div>
      </main>
    </div>
  )
}

export default App
