import PropTypes from 'prop-types'
import styles from './FormTextarea.module.css'

function FormTextarea({ label, id, value, onChange, placeholder, rows, required }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <textarea
        className={styles.textarea}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </div>
  )
}

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
}

FormTextarea.defaultProps = {
  placeholder: '',
  rows: 4,
  required: false,
}

export default FormTextarea
