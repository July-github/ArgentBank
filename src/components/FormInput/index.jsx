import PropTypes from 'prop-types'


function FormInput({label}){

    return(
        <div className="input-wrapper">
            <label htmlFor={label}>{label}</label>
            <input type="text" id={label} />
        </div>
    )
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
}

export default FormInput