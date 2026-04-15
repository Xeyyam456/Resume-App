import { useState } from 'react'
import PropTypes from 'prop-types'
import { validate as runValidate } from '@/utils/validation'
import styles from './FormInput.module.css'

function FormInput({ label, id, type, value, onChange, placeholder, required, validate }) {
  const [touched, setTouched] = useState(false)

  const errorMsg = touched && validate.length > 0
    ? runValidate(value, validate)
    : null

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <input
        className={`${styles.input} ${errorMsg ? styles.inputError : ''}`}
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        required={required}
      />
      {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
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
  validate: PropTypes.arrayOf(PropTypes.string),
}

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
  validate: [],
}

export default FormInput
