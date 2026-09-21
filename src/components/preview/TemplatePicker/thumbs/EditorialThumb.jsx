import styles from '../styles/thumbs.module.css'

function EditorialThumb() {
  return (
    <span className={styles.tEditRoot}>
      <span className={styles.tEditLeft}>
        <span className={styles.tAvatarC} />
        <span className={styles.tPillGold} style={{ width: '70%' }} />
        <span className={styles.tPillGold} style={{ width: '55%' }} />
      </span>
      <span className={styles.tEditRight}>
        <span className={styles.tScriptSerif} />
        <span className={styles.tEditCard}>
          <span className={styles.tLine} style={{ width: '80%' }} />
          <span className={styles.tLine} style={{ width: '65%', marginTop: 3 }} />
        </span>
      </span>
    </span>
  )
}

export default EditorialThumb
