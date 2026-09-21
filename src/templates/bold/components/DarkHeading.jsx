import PropTypes from 'prop-types'
import styles from '../styles/DarkHeading.module.css'

function DarkHeading({ children }) {
  return <h2 className={styles.darkBadge}>{children}</h2>
}

DarkHeading.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkHeading
