import Navbar from '@components/UI/Navbar'
import Footer from '@components/UI/Footer'
import './stylesheet/Base.css'

const Base = ({ children }) => {
  return (
    <section className = 'base-container'>
      <Navbar />
      <div className = 'base-body'>
        {children}
      </div>
      <Footer />
    </section>
  )
}

export default Base