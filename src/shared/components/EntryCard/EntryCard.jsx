import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@/components/ui/Button'
import styles from './EntryCard.module.css'

function EntryCard({ title, onRemove, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▶</span>
          <span className={styles.title}>{title || 'Untitled'}</span>
        </button>
        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
          ariaLabel="Remove entry"
        >
          ✕
        </Button>
      </div>
      {isOpen && <div className={styles.body}>{children}</div>}
    </div>
  )
}

EntryCard.propTypes = {
  title: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
}

EntryCard.defaultProps = {
  title: '',
  defaultOpen: true,
}

export default EntryCard
