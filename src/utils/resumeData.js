export const INITIAL_RESUME_DATA = {
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

export const ITEM_TEMPLATES = {
  experience: { company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
  education: { school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
  skills: { name: '', level: 'Intermediate' },
  projects: { name: '', description: '', technologies: '', link: '' },
}
