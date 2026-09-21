import PropTypes from 'prop-types'
import styles from './SectionCard.module.css'

function SectionCard({ icon, title, children }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

SectionCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

SectionCard.defaultProps = {
  icon: undefined,
}

export default SectionCard
