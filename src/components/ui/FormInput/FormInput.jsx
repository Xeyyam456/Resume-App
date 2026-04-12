import PropTypes from 'prop-types'
import styles from './FormInput.module.css'

function FormInput({ label, id, type, value, onChange, placeholder, required }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
}

export default FormInput
