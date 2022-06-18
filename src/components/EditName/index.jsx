import Button from "../Button"
import FormInput from "../FormInput"

function EditName({editUser, firstName, lastName, setValue}){


    function save(){

        editUser()
    }

    function cancel(){

        editUser()
    }

    return(
        <form id="editName">
            <FormInput 
                label=''
                type="text" 
                id='editFirstName'
                value={firstName}
                onChange={setValue}
            />
            <FormInput 
                label=''
                type="text" 
                id='editLastName'
                value={lastName}
                onChange={setValue}            
            />
            <Button onClick={save}
                buttonClass='saveEditButton'
                buttonTitle='saveEditButton'
            />
            <Button onClick={cancel}
                buttonClass='cancelEditButton'
                buttonTitle='cancelEditButton'
            />
        </form>
    )
}

export default EditName