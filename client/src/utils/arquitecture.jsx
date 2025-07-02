import { Handle } from '@xyflow/react'

export const InputNode = ({ data }) => {
  return (
    <div className = 'custom_node-input'>
      <Handle 
        className = 'custom_node-handle' 
        type = 'source' 
        position = 'right' 
        id = 'source' 
        isConnectable = {false} />
      <span>
        <span>X<span className = 'text-xsmall'>1</span></span>
        <span>X<span className = 'text-xsmall'>2</span></span>
        <span className = 'point' />
        <span className = 'point' />
        <span className = 'point' />
        <span className = 'point' />
        <span className = 'point' />
        <span className = 'point' />
        <span>X<span className = 'text-xsmall'>783</span></span>
        <span>X<span className = 'text-xsmall'>784</span></span>
      </span>
    </div>
  )
}

export const HiddenNode = ({ data }) => {
  return (
    <div className = 'custom_node-hidden'>
      <Handle 
        className = 'custom_node-handle' 
        type = 'source' 
        position = 'right' 
        id = 'source' 
        isConnectable = {false} />
      <span>{data.label}</span>
      <Handle 
        className = 'custom_node-handle' 
        type = 'target' 
        position = 'left' 
        id = 'target' 
        isConnectable = {false} />
    </div>
  )
}

export const OutputNode = ({ data }) => {
  return (
    <div className = 'custom_node-output'>
      <span>
        { data.label.toUpperCase().split('').map((char, idx) => (
          <span key = {`char-${idx}`}>{char}</span>
        )) }
      </span>
      <Handle 
        className = 'custom_node-handle' 
        type = 'target' 
        position = 'left' 
        id = 'target' 
        isConnectable = {false} />
    </div>
  )
}

const calcInnerSpace = (n, nodeH) => {
  let gap = 10
  return n * (nodeH + gap) - gap
}

const calcMaxHeight = (maxNeurons) => {
  let maxHeight = 232
  let innerSpace = calcInnerSpace(maxNeurons, 48)
  if (innerSpace > maxHeight) maxHeight = innerSpace
  return maxHeight
}

const calcX = (idx_layer) => {
  let nodeW = 48
  let gap = 120
  let x = (nodeW + gap) * idx_layer
  return x
}

const calcY = (n, maxHeight, start, end) => {
  let nodeH = (start || end) ? 232 : 48
  let gap = 10

  const innerSpace = calcInnerSpace(n, nodeH)
  const Y = []

  for(let i = 0; i < n; i++) {
    let value = (maxHeight - innerSpace) / 2 + i * (nodeH + gap)
    Y.push(value)
  }
  return Y
}

const calcPositionsX = (layers) => {
  const positionsX = []
  for(let i = 0; i < layers; i++) {
    positionsX.push(calcX(i))
  }

  return positionsX
}

const calcPositionsY = (neurons) => {
  let maxHeight = calcMaxHeight(Math.max(...neurons))

  const positionsY = []
  for(let i = 0; i < neurons.length; i++) {
    positionsY.push(calcY(neurons[i], maxHeight, i === 0, i === neurons.length - 1))
  }

  return positionsY
}

export const getNodes = (layers, neurons) => {
  const copyLayers = layers + 2
  const copyNeurons = [1, ...neurons, 1]
  const positionsX = calcPositionsX(copyLayers)
  const positionsY = calcPositionsY(copyNeurons)

  const nodes = []
  let cont = 0
  for(let i = 0; i < copyLayers; i++) {
    let num_neurons = copyNeurons[i]
    for(let j = 1; j <= num_neurons; j++) {
      cont += 1
      const node = {
        id: cont.toString(), 
        type: i === 0 ? 'customInput' : i === copyLayers - 1 ? 'customOutput' : 'customHidden', 
        position: { x: positionsX[i], y: positionsY[i][j - 1] }, 
        data: { label: i === 0 ? `X${j}` : i === copyLayers - 1 ? 'Softmax' : '' }
      }
      nodes.push(node)
    }
  }

  return nodes
}

export const getEdges = (layers, neurons) => {
  const copyLayers = layers + 2
  const copyNeurons = [1, ...neurons, 1]

  let id = 1
  const layerIds = []
  for(let i = 0; i < copyLayers; i++) { 
    const neuronsIds = []
    for(let j = 0; j < copyNeurons[i]; j++) {
      neuronsIds.push(id)
      id += 1
    }
    layerIds.push(neuronsIds)
  }

  const edges = []
  for(let i = 0; i < copyLayers; i++) {
    const sourceLayer = layerIds[i]
    const targetLayer = i === copyLayers - 1 ? [] : layerIds[i + 1]

    for(let j = 0; j < sourceLayer.length; j++) { 
      for(let k = 0; k < targetLayer.length; k++) {
        const edge = {
          id: `e${sourceLayer[j]}-${targetLayer[k]}`, 
          source: sourceLayer[j].toString(), 
          handleSource: 'source', 
          target: targetLayer[k].toString(), 
          handleTarget: 'target', 
          type: 'straight', 
          style: { stroke: 'var(--color-red)', strokeWidth: 1 },
        }
        edges.push(edge)
      }
    }
  }

  return edges
}