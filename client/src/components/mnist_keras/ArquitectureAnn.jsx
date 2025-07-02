import { useState, useEffect } from 'react'
import { ReactFlow } from '@xyflow/react'
import ControlArquitecture from '@components/mnist_keras/ControlArquitecture'
import { getNodes, getEdges, InputNode, HiddenNode, OutputNode } from '@utils/arquitecture'
import '@xyflow/react/dist/style.css'
import './stylesheets/ArquitectureAnn.css'

const ArquitectureAnn = ({ neuronsState }) => {
  const [hiddenLayers, setHiddenLayers] = useState(1)
  const [nodes, setNodes] = useState(
    getNodes(
      hiddenLayers, 
      neuronsState.neurons
    )
  )
  const [edges, setEdges] = useState(
    getEdges(
      hiddenLayers, 
      neuronsState.neurons
    )
  )
  const [flowKey, setFlowKey] = useState(0)

  useEffect(() => {
    setNodes(getNodes(
      hiddenLayers, 
      neuronsState.neurons
    ))
    setEdges(getEdges(
      hiddenLayers, 
      neuronsState.neurons
    ))
    setFlowKey(prevKey => prevKey + 1)
  }, [hiddenLayers, neuronsState])

  const customNodes = {
    customInput: InputNode,
    customHidden: HiddenNode,
    customOutput: OutputNode
  }

  return (
    <article className = 'arquitecture_ann-container'>
      <div className = 'arquitecture_ann-panel'>
        <span className = 'arquitecture_ann-panel-col'>
          <span>FEATURES</span>
          <span className = 'text-small text-color-secondary'>Normalized and flattened input data for training the artificial neural network.</span>
        </span>

        <span className = 'arquitecture_ann-panel-col'>
          <ControlArquitecture 
            type = 'layer' 
            text = {`${hiddenLayers} HIDDEN LAYERS`} 
            layerState = {{ hiddenLayers, setHiddenLayers }} 
            neuronState = {neuronsState} />
          
          <span className = 'arquitecture_ann-panel-neurons'>
            { neuronsState.neurons.map((n, idx) => (
              <ControlArquitecture 
                key = {`layer-${idx}`} 
                type = 'neuron' 
                text = {`${n} neurons`} 
                idx = {idx} 
                layerState = {{ hiddenLayers, setHiddenLayers }} 
                neuronState = {neuronsState} />
            )) }
          </span>
        </span>

        <span className = 'arquitecture_ann-panel-col'>
          <span>OUTPUTS</span>
          <span className = 'text-small text-color-secondary'>Results transformed into class-normalized probabilities using softmax.</span>
        </span>
      </div>

      <div className='arquitecture_ann-body'>
        <ReactFlow 
          key = {flowKey}
          proOptions = {{ hideAttribution: true }}
          defaultNodes = {nodes} 
          defaultEdges = {edges}
          nodeTypes = {customNodes} 
          panOnDrag = {false} 
          panOnScroll = {false} 
          zoomOnScroll = {false} 
          zoomOnPinch = {false} 
          zoomOnDoubleClick = {false} 
          nodesDraggable = {false}
          fitView />
      </div>
    </article>
  )
}

export default ArquitectureAnn