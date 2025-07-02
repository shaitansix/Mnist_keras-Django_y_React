import { useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { ResetIcon } from '@icons/Icons'
import { classifyImage, testImage } from '@services/model.js'
import './stylesheets/PredictPanel.css'

const PredictPanel = ({ id }) => {
  const canvasRef = useRef(null)
  const [response, setResponse] = useState(null)
  const [mode, setMode] = useState('test')
  const [imgString, setImgString] = useState(null)

  const handleClear = (event) => {
    canvasRef.current?.clearCanvas()
  }

  const handleClassify = async (event) => {
    const dataUrl = await canvasRef.current?.exportImage('jpg')
    const res = await classifyImage(id, { image: dataUrl })
    setResponse({ 
      result: res?.data?.number.toString(), 
      probability: parseInt(res?.data?.probability * 100)
    })
  }

  const handleGenerate = async (event) => {
    const res = await testImage(id)
    setImgString(res?.data?.image)
    setResponse({ 
      result: res?.data?.number.toString(), 
      probability: parseInt(res?.data?.probability * 100)
    })
  }

  return (
    <article className = 'predict_panel-container'>
      <div className = 'predict_panel-header'>
        <div>
          <span>PREDICT</span>
          <ButtonMode mode = {mode} setMode = {setMode} />
        </div>
        <span className = 'text-small text-color-secondary'>Draw a digit (0-9) in the center and click 'Classify' or switch to 'test' mode and click 'Generate' for the neural network to identify it.</span>
      </div>

      { mode === 'draw' && 
        <div className = 'predict_panel-canvas'>
          <ReactSketchCanvas 
            ref = {canvasRef} 
            strokeColor = 'hsl(0, 8%, 10%)' 
            strokeWidth = {20} 
            style = {{ borderRadius: 0, border: '1px solid var(--color-black)' }} />
          <button className = 'custom-circle_button-sm btn-primary' onClick = {handleClear}>
            <ResetIcon className = 'predict_panel-icon' />
          </button>
        </div>
      }

      { mode === 'test' && 
        <div className = 'predict_panel-image'>
          { imgString && <img src = {imgString} alt = 'image-test' /> }
        </div>
      }

      <div className = 'predict_panel-footer'>
        <span>
          <span className = 'text-small'>Response: {response ? response.result : ''}</span>
          <span className = 'text-small'>Probability: {response ? `${response.probability}%` : ''}</span>
        </span>
        <button className = 'custom-button btn-primary' disabled = {Boolean(!id)} onClick = { mode === 'draw' ? handleClassify : mode === 'test' ? handleGenerate : null }>
          { mode === 'draw' ? 'Classify' : mode === 'test' ? 'Generate' : '' }
        </button>
      </div>
    </article>
  )
}

const ButtonMode = ({ mode, setMode }) => {
  const handleDraw = () => {
    setMode('draw')
  }

  const handleTest = () => {
    setMode('test')
  }

  return (
    <span className = 'button_mode-container'>
      <button className = {`custom-button button_mode-custom ${mode === 'draw' ? 'button_mode-active' : ''}`} onClick = {handleDraw}>
        Draw
      </button>
      <button className = {`custom-button button_mode-custom ${mode === 'test' ? 'button_mode-active' : ''}`} onClick = {handleTest}>
        Test
      </button>
    </span>
  )
}

export default PredictPanel