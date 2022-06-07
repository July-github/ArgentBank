import PropTypes from 'prop-types'
import Button from '../../components/Button/index'

function AccountWrap({accountTitle, accountAmount, accountDescription}){

    return(
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{accountTitle}</h3>
                <p className="account-amount">{accountAmount}</p>
                <p className="account-amount-description">{accountDescription}</p>
            </div>
            <div className="account-content-wrapper cta">
                <Button 
                    buttonClass='transaction-button'
                    buttonTitle='View transactions'
                />
            </div>
        </section>
    )
}

AccountWrap.propTypes = {
    accountTitle: PropTypes.string.isRequired,
    accountAmount: PropTypes.string.isRequired,
    accountDescription: PropTypes.string.isRequired,
}

export default AccountWrap