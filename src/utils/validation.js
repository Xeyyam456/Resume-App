export const RULES = {
  required: {
    test: v => v.trim().length > 0,
    message: 'This field is required',
  },

  email: {
    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    message: 'Must be a valid email address (e.g. john@example.com)',
  },

  phone: {
    test: v => /^\+?[\d][\d\s\-().]{5,18}[\d]$/.test(v.trim()),
    message: 'Must be a valid phone number (e.g. +1 555 000 0000)',
  },

  name: {
    test: v => /^[a-zA-Z\u00C0-\u024F\u0259\u018F\s\-']+$/.test(v.trim()),
    message: 'Name must only contain letters (no numbers or symbols)',
  },

  jobTitle: {
    test: v => !/\d/.test(v.trim()),
    message: 'Job title must not contain numbers',
  },

  location: {
    test: v => /[a-zA-Z\u00C0-\u024F\u0259\u018F]/.test(v),
    message: 'Location must contain at least one letter',
  },

  url: {
    test: v => /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=#]*)?$/.test(v.trim()),
    message: 'Must be a valid URL (e.g. yoursite.dev)',
  },

  linkedin: {
    test: v => /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]{3,100}\/?$/.test(v.trim()),
    message: 'Must be a LinkedIn profile URL (e.g. linkedin.com/in/yourname)',
  },

  github: {
    test: v => /^(https?:\/\/)?(www\.)?github\.com\/[\w-]{1,39}(\/[\w.-]+)?\/?$/.test(v.trim()),
    message: 'Must be a GitHub URL (e.g. github.com/yourname)',
  },

  noAtSign: {
    test: v => !v.includes('@'),
    message: 'This field should not contain @',
  },
}

export function validate(value, ruleNames = []) {
  const isEmpty = value.trim().length === 0

  for (const name of ruleNames) {
    const rule = RULES[name]
    if (!rule) continue
    if (isEmpty && name !== 'required') continue
    if (!rule.test(value)) return rule.message
  }

  return null
}
