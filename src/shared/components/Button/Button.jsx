import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({
  children,
  onClick,
  type,
  variant,
  size,
  fullWidth,
  active,
  disabled,
  ariaLabel,
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    variant === 'ghost' && active ? styles.ghostActive : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'dashed', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
}

Button.defaultProps = {
  onClick: undefined,
  type: 'button',
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  active: false,
  disabled: false,
  ariaLabel: undefined,
}

export default Button
