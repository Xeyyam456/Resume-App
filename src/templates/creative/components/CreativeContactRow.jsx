import PropTypes from 'prop-types'
import styles from './CreativeTemplate.module.css'

function CreativeContactRow({ items }) {
  if (items.length === 0) return null

  return (
    <div className={styles.contactRow}>
      {items.map((item, i) => (
        <span key={i} className={styles.contactItem}>
          <span className={styles.contactIcon}>{item.icon}</span>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer" className={styles.contactLink}>{item.label}</a>
          ) : (
            item.label
          )}
        </span>
      ))}
    </div>
  )
}

CreativeContactRow.propTypes = {
  items: PropTypes.array.isRequired,
}

export default CreativeContactRow
