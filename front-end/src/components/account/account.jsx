import { accountContent } from '../../utils/content'

const Account = () => {
  return (
    <div>
      {accountContent.map((item, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{item.title}</h3>
            <p className="account-amount">{item.price}</p>
            <p className="account-amount-description">{item.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">{item.button}</button>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Account
