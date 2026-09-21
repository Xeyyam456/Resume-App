import styles from '../styles/thumbs.module.css'

function ExecutiveThumb() {
  return (
    <>
      <span className={styles.tExecLeft}>
        <span className={styles.tAvatarC} />
        <span className={styles.tLineOnDark} style={{ width: '60%' }} />
        <span className={styles.tLineOnDark} style={{ width: '45%' }} />
      </span>
      <span className={styles.tMainWhite}>
        <span className={styles.tGoldBar} style={{ width: '75%' }} />
        <span className={styles.tLine} style={{ width: '85%', marginTop: 4 }} />
        <span className={styles.tGoldBar} style={{ width: '60%' }} />
        <span className={styles.tLine} style={{ width: '70%', marginTop: 4 }} />
      </span>
    </>
  )
}

export default ExecutiveThumb
