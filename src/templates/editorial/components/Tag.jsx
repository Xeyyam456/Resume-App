import PropTypes from 'prop-types'
import styles from '../styles/Tag.module.css'

function Tag({ icon, children }) {
  return (
    <h3 className={styles.sTag}>
      <span className={styles.sTagIcon}>{icon}</span>
      <span className={styles.sTagPill}>{children}</span>
    </h3>
  )
}

Tag.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

export default Tag
