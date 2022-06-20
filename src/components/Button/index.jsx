import PropTypes from 'prop-types'

function Button({buttonTitle, buttonClass}){

    return(
        <button className={buttonClass}>
            {buttonTitle}
        </button>
    )
}

Button.propTypes = {
    buttonClass: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
}

export default Button