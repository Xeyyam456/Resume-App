import PropTypes from 'prop-types'
import { TEMPLATES } from '@/templates'
import styles from './TemplatePicker.module.css'

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
        <span className={styles.tAvatarC} />
        <span className={styles.tLineOnDark} style={{ width: '65%' }} />
        <span className={styles.tLineOnDark} style={{ width: '50%' }} />
      </span>
    </>
  )
}

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

function CreativeThumb() {
  return (
    <span className={styles.tCreativeCanvas}>
      <span className={styles.tCreativeHeader}>
        <span className={styles.tAvatarSqDark} />
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

const THUMBS = {
  sidebar: SidebarThumb,
  diagonal: DiagonalThumb,
  banner: BannerThumb,
  creative: CreativeThumb,
  monochrome: MonochromeThumb,
  executive: ExecutiveThumb,
  bold: BoldThumb,
  editorial: EditorialThumb,
}

function TemplatePicker({ selectedId, onSelect }) {
  return (
    <div className={styles.row}>
      {TEMPLATES.map(template => {
        const Thumb = THUMBS[template.id]
        return (
          <button
            key={template.id}
            type="button"
            className={`${styles.card} ${template.id === selectedId ? styles.cardActive : ''}`}
            onClick={() => onSelect(template.id)}
            title={template.description}
          >
            <span className={`${styles.thumb} ${styles[`thumb-${template.id}`]}`} aria-hidden="true">
              {Thumb && <Thumb />}
            </span>
            <span className={styles.name}>{template.name}</span>
          </button>
        )
      })}
    </div>
  )
}

TemplatePicker.propTypes = {
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default TemplatePicker
