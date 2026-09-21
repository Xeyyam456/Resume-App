import styles from '../styles/thumbs.module.css'

function BoldThumb() {
  return (
    <>
      <span className={styles.tBoldLeft}>
        <span className={styles.tAvatarC} />
        <span className={styles.tLineOnDark} style={{ width: '65%' }} />
        <span className={styles.tLineOnDark} style={{ width: '50%' }} />
      </span>
      <span className={styles.tBoldRight}>
        <span className={styles.tLineDarkBold} style={{ width: '80%' }} />
        <span className={styles.tDarkPill} style={{ width: '55%' }} />
        <span className={styles.tLineDark} style={{ width: '70%', marginTop: 4 }} />
      </span>
    </>
  )
}

export default BoldThumb
