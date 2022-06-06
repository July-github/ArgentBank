import '../../utils/style/index.scss';
import PropTypes from 'prop-types'

function FeatureCard({icon, featureTitle, featureInfos}){

    return(
        <div className="feature-item">
            <img src={icon} alt='feature icon' className="feature-icon" />
            <h3 className="feature-item-title">{featureTitle}</h3>
            <p>{featureInfos}</p>
        </div>
    )
}

FeatureCard.propTypes = {
    icon: PropTypes.string.isRequired,
    featureTitle: PropTypes.string.isRequired,
    featureInfos: PropTypes.string.isRequired,
}

export default FeatureCard