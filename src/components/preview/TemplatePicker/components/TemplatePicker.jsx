import PropTypes from 'prop-types'
import { TEMPLATES } from '@/templates'
import { THUMBS } from '../thumbs'
import styles from '../styles/TemplatePicker.module.css'

function TemplatePicker({ selectedId, onSelect }) {
  return (
    <div className={styles.row}>
      {TEMPLATES.map(template => {
        const Thumb = THUMBS[template.id]
        return (
          <button
            key={template.id}
            type="button"
            className={`${styles.card} ${template.id === selectedId ? styles.cardActive : ''}`}
            onClick={() => onSelect(template.id)}
            title={template.description}
          >
            <span className={`${styles.thumb} ${styles[`thumb-${template.id}`]}`} aria-hidden="true">
              {Thumb && <Thumb />}
            </span>
            <span className={styles.name}>{template.name}</span>
          </button>
        )
      })}
    </div>
  )
}

TemplatePicker.propTypes = {
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default TemplatePicker
