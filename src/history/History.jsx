
import CloseIcon from '../assets/close-icon.png'
import HistoryInfo from './HistoryInfo'

export default function History(props) {
  const history = props.historyState.map(item => (
    <HistoryInfo key={item.id} item={item} />
  ))

  return (
    <div className='history-container'>
      <h2>History</h2>
      <img 
        src={CloseIcon} 
        alt="Close icon"
        className='close-icon icon'
        onClick={props.openHistory}
      />
      <h4 
        className='delete-all-history'
        onClick={props.deleteAllHistory}
      >
        Delete all
      </h4>
      
      {history}
    </div>
  )
}