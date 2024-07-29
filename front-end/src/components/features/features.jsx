import { featuresContent } from '../../utils/content'

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresContent.map((item, index) => (
        <div className="feature-item" key={index}>
          <img src={item.img} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  )
}

export default Features
