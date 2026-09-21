import PropTypes from 'prop-types'
import styles from '../styles/GoldHeading.module.css'

function GoldHeading({ children }) {
  return <h2 className={styles.goldBar}>{children}</h2>
}

GoldHeading.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GoldHeading
