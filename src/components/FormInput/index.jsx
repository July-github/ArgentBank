import PropTypes from 'prop-types'


function FormInput({label, value, setValue}){

    return(
        <div className="input-wrapper">
            <label htmlFor={label}>
                {label}
                </label>
            <input 
                type="text" 
                id={label} 
                value={value}
                onChange={setValue}
            />
        </div>
    )
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default FormInput