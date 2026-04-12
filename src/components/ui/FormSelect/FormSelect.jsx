import PropTypes from 'prop-types'
import styles from './FormSelect.module.css'

function FormSelect({ label, id, value, onChange, options, required }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <select
        className={styles.select}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
}

FormSelect.defaultProps = {
  required: false,
}

export default FormSelect
