import styles from '../styles/thumbs.module.css'

function DiagonalThumb() {
  return (
    <>
      <span className={styles.tMainWhite} style={{ flex: '0 1 58%' }}>
        <span className={styles.tHeadingRow}>
          <span className={styles.tSquare} />
          <span className={styles.tLine} style={{ width: '55%' }} />
        </span>
        <span className={styles.tLine} style={{ width: '80%' }} />
        <span className={styles.tHeadingRow} style={{ marginTop: 5 }}>
          <span className={styles.tSquare} />
          <span className={styles.tLine} style={{ width: '45%' }} />
        </span>
      </span>
      <span className={styles.tDiagDark}>
        <span className={styles.tAvatarCGreen} />
        <span className={styles.tLineOnDark} style={{ width: '65%' }} />
        <span className={styles.tLineOnDark} style={{ width: '50%' }} />
      </span>
    </>
  )
}

export default DiagonalThumb
