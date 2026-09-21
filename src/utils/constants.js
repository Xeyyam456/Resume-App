export const SKILL_LEVELS = [
  { value: 'Beginner', label: '🔵 Beginner', rank: 1 },
  { value: 'Elementary', label: '🟢 Elementary', rank: 2 },
  { value: 'Intermediate', label: '🟡 Intermediate', rank: 3 },
  { value: 'Advanced', label: '🟠 Advanced', rank: 4 },
  { value: 'Expert', label: '🔴 Expert', rank: 5 },
]

export const SKILL_LEVEL_OPTIONS = SKILL_LEVELS.map(({ value, label }) => ({ value, label }))

export const SKILL_LEVEL_RANKS = Object.fromEntries(
  SKILL_LEVELS.map(({ value, rank }) => [value, rank])
)
