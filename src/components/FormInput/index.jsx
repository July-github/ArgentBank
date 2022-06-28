import PropTypes from 'prop-types'

function FormInput({label, value, setValue, type}){

    return(
        <div className="input-wrapper">
            <label htmlFor={label}>
                {label}
                </label>
            <input 
                type={type} 
                id={label} 
                placeholder={value}
                onChange={setValue}
            />
        </div>
    )
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    setValue: PropTypes.func,
}

export default FormInput