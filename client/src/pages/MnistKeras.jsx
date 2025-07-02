import { useState } from 'react'
import Panel from '@components/mnist_keras/Panel'
import ArquitectureAnn from '@components/mnist_keras/ArquitectureAnn'
import OutputPanel from '@components/mnist_keras/OutputPanel'
import PredictPanel from '@components/mnist_keras/PredictPanel'
import TextSection from '@components/mnist_keras/TextSection'
import './stylesheets/MnistKeras.css'

const MnistKeras = () => {
  const [neurons, setNeurons] = useState([10])
  const [modelResult, setModelResult] = useState(null)

  return (
    <section className = 'mnist_keras-wrapper'>
      <div className = 'mnist_keras-container container'>
        <div className = 'mnist_keras-panel'>
          <Panel neurons = {neurons} setModelResult = {setModelResult} />
        </div>

        <div className = 'mnist_keras-body'>
          <article className = 'mnist_keras-arq_ann'>
            <ArquitectureAnn  
              neuronsState = {{ neurons, setNeurons }} />
          </article>

          <article className = 'mnist_keras-output'>
            <OutputPanel modelResult = {modelResult} />
            <PredictPanel id = {modelResult?.id} />
          </article>
        </div>

        <div className = 'mnist_keras-footer container-md'>
          <TextSection title = 'Introduction to the MNIST Dataset'>
            <span>The <strong>MNIST dataset</strong> (Modified National Institute of Standards and Technology) is one of the most well-known and widely used datasets in machine learning and computer vision. It consists of 70,000 grayscale images of handwritten digits (0 to 9), each of size 28×28 pixels. The dataset is split into:</span>
            <span>60,000 training images</span>
            <span>10,000 test images</span>
          </TextSection>

          <TextSection title = 'Key Features of MNIST'>
            <span>Simple yet effective for benchmarking: Due to its small size and simplicity, MNIST is often used to test new machine learning models, particularly for image classification tasks.</span>
            <span><strong>Preprocessed and normalized:</strong> The digits are centered and scaled, making it easier to train models without extensive data cleaning.</span>
            <span><strong>Common baseline for deep learning:</strong> Many neural network architectures (like CNNs) are first tested on MNIST to ensure correct implementation before moving to more complex datasets.</span>
          </TextSection>

          <TextSection title = 'Why is MNIST Popular?'>
            <span><strong>Easy to use:</strong> Integrated into libraries like TensorFlow (tf.keras.datasets.mnist) and PyTorch.</span>
            <span><strong>Fast training:</strong> Small size allows quick experimentation even on CPUs.</span>
            <span><strong>Good for education:</strong> Helps beginners understand image classification without heavy computational requirements.</span>
          </TextSection>
        </div>
      </div>
    </section>
  )
}

export default MnistKeras