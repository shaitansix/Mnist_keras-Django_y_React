import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { usePetition } from '@store/Petition'
import './stylesheets/OutputPanel.css'

Chart.register(PointElement, LineElement, LinearScale, CategoryScale)

const OutputPanel = ({ modelResult }) => {
  const completed = usePetition((state) => state.completed)

  const data = { 
    labels: [...Array(modelResult?.history_loss.length).keys()].map((value) => value + 1), 
    datasets: [
      {
        data: modelResult?.history_loss, 
        showLine: true, 
        pointRadius: 0, 
        borderWidth: 2, 
        borderColor: 'hsl(0, 8%, 10%)', 
        tension: 0.4
      }, 
      {
        data: modelResult?.history_acc, 
        showLine: true, 
        pointRadius: 0, 
        borderWidth: 2, 
        borderColor: 'hsl(0, 8%, 50%)', 
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true, 
    scales: {
      x: {
        ticks: {
          maxRotation: 0, 
          minRotation: 0, 
          autoSkip: true, 
          font: { size: 8 }
        }
      }, 
      y: {
        ticks: { 
          autoSkip: true, 
          font: { size: 8 }
        }
      }
    }
  }

  return (
    <article className = 'output_panel-container'>
      <span>
        <span>METRICS</span>
        { !completed && <span className = 'warning text-warn'>Training...</span> }
      </span>
      <article className = 'output_panel-metrics'>
        <span className = 'output_panel-metrics-left'>
          <span className = 'text-small'>Test loss: {modelResult ? parseInt(modelResult?.loss * 100) / 100 : 0}</span>
          <span className = 'text-small'>Test accuracy: {modelResult ? parseInt(modelResult?.accuracy * 100) / 100 : 0}</span>
        </span>
        <span className = 'output_panel-metrics-right'>
          { modelResult && 
            <Line data = {data} options = {options} />
          }
        </span>
      </article>
    </article>
  )
}

export default OutputPanel