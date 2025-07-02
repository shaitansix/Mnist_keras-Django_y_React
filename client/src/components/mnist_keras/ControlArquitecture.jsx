import { usePetition } from '@store/Petition'
import { PlusIcon, MinusIcon } from '@icons/Icons'
import './stylesheets/ControlArquitecture.css'

const ControlArquitecture = ({ type, text, idx, layerState, neuronState }) => { 
  const completed = usePetition((state) => state.completed)

  const handleAddHiddenLayer = (event) => {
    event.preventDefault()
    const hiddenLayers = layerState.hiddenLayers
    const neurons = neuronState.neurons
    if (hiddenLayers < 2) {
      layerState.setHiddenLayers(hiddenLayers + 1)
      neuronState.setNeurons([...neurons, 2])
    }
  }

  const handleRemoveHiddenLayer = (event) => {
    event.preventDefault()
    const hiddenLayers = layerState.hiddenLayers
    const neurons = neuronState.neurons
    if (hiddenLayers > 1) {
      layerState.setHiddenLayers(hiddenLayers - 1)
      neuronState.setNeurons(neurons.slice(0, -1))
    }
  }

  const handleAddNeuron = (event) => {
    event.preventDefault()
    const neurons = neuronState.neurons
    const newNeurons = [...neurons]
    if (newNeurons[idx] < 10) {
      newNeurons[idx] += 1
      neuronState.setNeurons(newNeurons)
    }
  }

  const handleRemoveNeuron = (event) => {
    event.preventDefault()
    const neurons = neuronState.neurons
    const newNeurons = [...neurons]
    if (newNeurons[idx] > 1) {
      newNeurons[idx] -= 1
      neuronState.setNeurons(newNeurons)
    }
  }

  return ( 
    <span className = {`control_arquitecture-${type}`}>
      <span className = {`control_arquitecture-${type}-btns`}>
        <button 
          className = 'custom-circle_button-sm btn-secondary' 
          onClick = {type === 'layer' ? handleAddHiddenLayer : type === 'neuron' && handleAddNeuron} 
          disabled = {!completed}>
          <PlusIcon className = 'control_arquitecture-icon' />
        </button>
        <button 
          className = 'custom-circle_button-sm btn-secondary' 
          onClick = {type === 'layer' ? handleRemoveHiddenLayer : type === 'neuron' && handleRemoveNeuron}
          disabled = {!completed}>
          <MinusIcon className = 'control_arquitecture-icon' />
        </button>
      </span>
      <span className = {type === 'neuron' ? 'text-small' : ''}>{text}</span>
    </span>
  )
}

export default ControlArquitecture