import { useNavigate } from 'react-router'
import TextSection from '@components/mnist_keras/TextSection'
import { CheckIcon } from '@icons/Icons'
import './stylesheets/Home.css'

const Home = () => {
  const navigate = useNavigate()

  const handleStart = () => navigate('/mnist-keras')

  return (
    <section className = 'home-wrapper'>
      <div className = 'home-hero container'>
        <article className = 'home-left'>
          <span className = 'text-header'>MNIST Neural Network Playground</span>
          <div>
            This is an interactive space to explore densely connected neural networks using the famous MNIST dataset of handwritten digits.
          </div>
          <div>
            <HomeItem>Build your own artificial neural network architecture.</HomeItem>
            <HomeItem>Configure the hyperparameters of your artificial network.</HomeItem>
            <HomeItem>See how the network learns to classify digits in real time.</HomeItem>
            <HomeItem>Try different settings and see the results.</HomeItem>
          </div>
          <button className = 'custom-button btn-primary' onClick = {handleStart}>Get Started</button>
        </article>

        <div className = 'home-right'>
          <img src = '/keras-mnist.svg' alt = 'keras-mnist' />
        </div>
      </div>

      <div className = 'home-body container-md'>
        <TextSection title = 'How It Works'>
          <span>Welcome to MNIST Neural Network Playground, an interactive web application inspired by <a className = 'custom-link' href = 'https://playground.tensorflow.org' target = '_blank'>TensorFlow Playground</a> but designed for recognition of handwritten digits using the classic MNIST data set. This project allows users to experiment with different neural network architectures, adjust layers, neurons, activation functions and training parameters.</span>
        </TextSection>

        <TextSection>
          <span>Change network depth and width.</span>
          <span>Change the activation functions (ReLU, Sigmoid, Tanh) and see their impact.</span>
          <span>Adjust learning rates and batch sizes to observe convergence behavior.</span>
          <span>Draw digits directly in the browser and test model predictions instantly.</span>
        </TextSection>

        <TextSection>
          <span>Developed with React for a dynamic interface, Django as backend API and Keras for the neural network model, this platform integrates machine learning theory and practice into an interactive environment.</span>
          <a className = 'custom-link' href = 'https://github.com/shaitansix' target = '_blank'>
            <em>[For technical details and source code, visit the project’s GitHub repository.]</em>
          </a>
        </TextSection>
      </div>
    </section>
  )
}

const HomeItem = ({ children }) => {
  return (
    <span className = 'home-item'>
      <CheckIcon className = 'home-item-icon' />
      <span>{children}</span>
    </span>
  )
}

export default Home