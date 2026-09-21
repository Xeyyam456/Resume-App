import styles from '../styles/thumbs.module.css'

function CreativeThumb() {
  return (
    <span className={styles.tCreativeCanvas}>
      <span className={styles.tCreativeHeader}>
        <span className={styles.tAvatarSqViolet} />
        <span className={styles.tScript} />
      </span>
      <span className={styles.tRingsRow}>
        <span className={styles.tRing} />
        <span className={styles.tRing} />
        <span className={styles.tRing} />
      </span>
      <span className={styles.tLineOnDark} style={{ width: '80%' }} />
      <span className={styles.tLineOnDark} style={{ width: '60%' }} />
    </span>
  )
}

export default CreativeThumb
