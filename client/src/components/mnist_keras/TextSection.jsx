import './stylesheets/TextSection.css'

const TextSection = ({ title, children }) => {
  return (
    <article className = 'text_section-container'>
      { title && 
        <span className = 'text-title'>{title}</span>
      }
      <span className = 'text_section-body'>
        {children}
      </span>
    </article>
  )
}

export default TextSection