import styles from '../styles/thumbs.module.css'

function SidebarThumb() {
  return (
    <>
      <span className={styles.tSideDark}>
        <span className={styles.tAvatarC} />
        <span className={styles.tLineOnDark} style={{ width: '70%' }} />
        <span className={styles.tLineOnDark} style={{ width: '55%' }} />
        <span className={styles.tLineOnDark} style={{ width: '60%' }} />
      </span>
      <span className={styles.tMainWhite}>
        <span className={styles.tLineBold} style={{ width: '80%' }} />
        <span className={styles.tLineAccent} style={{ width: '55%' }} />
        <span className={styles.tLine} style={{ width: '90%', marginTop: 4 }} />
        <span className={styles.tLine} style={{ width: '75%' }} />
      </span>
    </>
  )
}

export default SidebarThumb
