import { useState, useEffect } from 'react'
import { ResetIcon, PlayIcon } from '@icons/Icons'
import { usePetition } from '@store/Petition'
import { fitModel } from '@services/model.js'
import './stylesheets/Panel.css'

const Panel = ({ neurons, setModelResult }) => {
  const completed = usePetition((state) => state.completed)
  const petitionInit = usePetition((state) => state.petitionInit)
  const petitionFinish = usePetition((state) => state.petitionFinish)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    setFormData(initialFormData())
  }, [])

  const initialFormData = () => {
    return {
      activation: 'sigmoid',
      epochs: 10,
      learning_rate: 0.5,
      ratio_train: 80,
      batch_size: 100
    }
  }

  const handleFormData = (event) => {
    event.preventDefault()
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value
    })
  }

  const handleReset = (event) => {
    event.preventDefault()
    setFormData(initialFormData())
  }

  const handlePlay = async (event) => {
    event.preventDefault()
    petitionInit()
    setModelResult(null)

    const body = { 
      ...formData, 
      epochs: parseInt(formData.epochs), 
      learning_rate: parseFloat(formData.learning_rate), 
      ratio_train: formData.ratio_train / 100, 
      batch_size: parseInt(formData.batch_size),
      arquitecture: [784, ...neurons, 10].join(',')
    }

    const res = await fitModel(body)
    setModelResult(res?.data)
    if (res) petitionFinish()
  }

  return (
    <article className = 'panel-wrapper'>
      <div className = 'panel-container'>
        { formData && <>
          <span className = 'panel-btns'>
            <button className = 'custom-circle_button-lg btn-primary' onClick = {handlePlay} disabled = {!completed}>
              <PlayIcon className = 'panel-icon' />
            </button>
            <button className = 'custom-circle_button-sm btn-secondary' onClick = {handleReset} disabled = {!completed}>
              <ResetIcon className = 'panel-icon' />
            </button>
          </span>

          <form className = 'panel-form'>
            <span className = 'form-group_input'>
              <label htmlFor = 'activation'>Activation</label>
              <select className = 'custom-select' id = 'activation' name = 'activation' value = {formData.activation} onChange = {handleFormData} disabled = {!completed}>
                <option value = 'relu'>ReLU</option>
                <option value = 'sigmoid'>Sigmoid</option>
                <option value = 'tanh'>Tanh</option>
              </select>
            </span>

            <span className = 'form-group_input'>
              <label htmlFor = 'epochs'>Epochs</label>
              <input className = 'custom-input' type = 'number' id = 'epochs' name = 'epochs' min = {1} max = {20} step = {1} value = {formData.epochs} onChange = {handleFormData} disabled = {!completed} />
            </span>

            <span className = 'form-group_input'>
              <label htmlFor = 'learning_rate'>Learning Rate</label>
              <input className = 'custom-input' type = 'number' id = 'learning_rate' name = 'learning_rate' min = {0.1} max = {1.0} step = {0.1} value = {formData.learning_rate} onChange = {handleFormData} disabled = {!completed} />
            </span>

            <span className = 'form-group_input'>
              <label htmlFor = 'ratio_train'>Ratio of Train</label>
              <input className = 'custom-input' type = 'number' id = 'ratio_train' name = 'ratio_train' min = {60} max = {90} step = {5} value = {formData.ratio_train} onChange = {handleFormData} disabled = {!completed} />
            </span>

            <span className = 'form-group_input'>
              <label htmlFor = 'batch_size'>Batch Size</label>
              <input className = 'custom-input' type = 'number' id = 'batch_size' name = 'batch_size' min = {100} max = {200} step = {10} value = {formData.batch_size} onChange = {handleFormData} disabled = {!completed} />
            </span>
          </form>
        </> }
      </div>
    </article>
  )
}

export default Panel