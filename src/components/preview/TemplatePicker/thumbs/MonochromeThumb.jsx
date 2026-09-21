import styles from '../styles/thumbs.module.css'

function MonochromeThumb() {
  return (
    <>
      <span className={styles.tMonoDark}>
        <span className={styles.tAvatarClip} />
        <span className={styles.tArrowRow}><span className={styles.tArrow} /><span className={styles.tLineOnDark} style={{ width: '65%' }} /></span>
        <span className={styles.tArrowRow}><span className={styles.tArrow} /><span className={styles.tLineOnDark} style={{ width: '50%' }} /></span>
      </span>
      <span className={styles.tMainWhite}>
        <span className={styles.tLineBoldUl} style={{ width: '85%' }} />
        <span className={styles.tLine} style={{ width: '90%', marginTop: 4 }} />
        <span className={styles.tLine} style={{ width: '70%' }} />
        <span className={styles.tLineBoldUl} style={{ width: '75%', marginTop: 6 }} />
        <span className={styles.tLine} style={{ width: '80%', marginTop: 4 }} />
      </span>
    </>
  )
}

export default MonochromeThumb
