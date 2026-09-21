import PropTypes from 'prop-types'
import styles from '../styles/CreativeHeading.module.css'

function CreativeHeading({ children }) {
  return (
    <h2 className={styles.heading}>
      <span className={styles.headingIcon}>➜</span>
      {children}
    </h2>
  )
}

CreativeHeading.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CreativeHeading
