import { useState } from 'react'
import { INITIAL_RESUME_DATA, ITEM_TEMPLATES } from '@/utils/resumeData'

export function useResumeData() {
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA)

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
    addExperience:    () => addItem('experience', ITEM_TEMPLATES.experience),
    updateExperience: (id, field, value) => updateItem('experience', id, field, value),
    removeExperience: (id) => removeItem('experience', id),
    addEducation:     () => addItem('education', ITEM_TEMPLATES.education),
    updateEducation:  (id, field, value) => updateItem('education', id, field, value),
    removeEducation:  (id) => removeItem('education', id),
    addSkill:         () => addItem('skills', ITEM_TEMPLATES.skills),
    updateSkill:      (id, field, value) => updateItem('skills', id, field, value),
    removeSkill:      (id) => removeItem('skills', id),
    addProject:       () => addItem('projects', ITEM_TEMPLATES.projects),
    updateProject:    (id, field, value) => updateItem('projects', id, field, value),
    removeProject:    (id) => removeItem('projects', id),
  }

  return { resumeData, handlers }
}
