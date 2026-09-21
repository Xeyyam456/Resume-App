import PropTypes from 'prop-types'
import { useBannerData } from './useBannerData'
import BannerHeader from './BannerHeader'
import BannerSkillsPanel from './BannerSkillsPanel'
import BannerTimeline from './BannerTimeline'
import styles from './BannerTemplate.module.css'

function BannerTemplate({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const { fullName, initials, contactItems, timeline } = useBannerData(personal, education, experience)

  return (
    <div className={styles.root}>
      <BannerHeader
        photo={personal.photo}
        initials={initials}
        fullName={fullName}
        jobTitle={personal.jobTitle}
        contactItems={contactItems}
      />
      <div className={styles.body}>
        <BannerSkillsPanel summary={summary} skills={skills} />
        <BannerTimeline timeline={timeline} projects={projects} />
      </div>
    </div>
  )
}

BannerTemplate.propTypes = {
  resumeData: PropTypes.object.isRequired,
}

export default BannerTemplate
