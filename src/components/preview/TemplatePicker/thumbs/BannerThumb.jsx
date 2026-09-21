import styles from '../styles/thumbs.module.css'

function BannerThumb() {
  return (
    <>
      <span className={styles.tBannerStrip}>
        <span className={styles.tAvatarCSm} />
        <span className={styles.tBannerLines}>
          <span className={styles.tLineOnBanner} style={{ width: '85%' }} />
          <span className={styles.tLineOnBanner} style={{ width: '60%' }} />
        </span>
      </span>
      <span className={styles.tBannerBody}>
        <span className={styles.tBannerLeft}>
          <span className={styles.tSlider} />
          <span className={styles.tSlider} />
          <span className={styles.tSlider} />
        </span>
        <span className={styles.tBannerRight}>
          <span className={styles.tTimelineRow}><span className={styles.tDot} /><span className={styles.tLine} style={{ width: '70%' }} /></span>
          <span className={styles.tTimelineRow}><span className={styles.tDot} /><span className={styles.tLine} style={{ width: '55%' }} /></span>
        </span>
      </span>
    </>
  )
}

export default BannerThumb
