import SidebarTemplate from './sidebar/SidebarTemplate'
import DiagonalTemplate from './diagonal/DiagonalTemplate'
import BannerTemplate from './banner/BannerTemplate'
import CreativeTemplate from './creative/CreativeTemplate'
import MonochromeTemplate from './monochrome/MonochromeTemplate'
import ExecutiveTemplate from './executive/ExecutiveTemplate'
import BoldTemplate from './bold/BoldTemplate'
import EditorialTemplate from './editorial/EditorialTemplate'

export const TEMPLATES = [
  { id: 'sidebar', name: 'Sidebar', description: 'Warm dark sidebar with a clean white body', Component: SidebarTemplate },
  { id: 'diagonal', name: 'Diagonal', description: 'Angled two-tone split with a photo panel', Component: DiagonalTemplate },
  { id: 'banner', name: 'Banner', description: 'Bold color header with a timeline layout', Component: BannerTemplate },
  { id: 'creative', name: 'Creative', description: 'Dark canvas with script accents and skill rings', Component: CreativeTemplate },
  { id: 'monochrome', name: 'Monochrome', description: 'Sharp black-and-white, ATS-friendly layout', Component: MonochromeTemplate },
  { id: 'executive', name: 'Executive', description: 'Black arched panel with gold & teal accents', Component: ExecutiveTemplate },
  { id: 'bold', name: 'Bold', description: 'High-contrast navy and yellow color blocking', Component: BoldTemplate },
  { id: 'editorial', name: 'Editorial', description: 'Charcoal and mustard with a serif headline', Component: EditorialTemplate },
]

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id

export function getTemplate(id) {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0]
}
