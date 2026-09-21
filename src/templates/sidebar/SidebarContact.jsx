import PropTypes from 'prop-types'
import styles from './CVSidebar.module.css'

function SidebarContact({ items }) {
  if (items.length === 0) return null

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>Contact</div>
      <ul className={styles.contactList}>
        {items.map((item, i) => (
          <li key={i} className={styles.contactItem}>
            <span className={styles.contactIcon}>{item.icon}</span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" className={styles.contactLink}>{item.value}</a>
            ) : (
              <span>{item.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

SidebarContact.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
}

export default SidebarContact
