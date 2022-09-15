
import useLogic from './hooks/useLogic'
import Popup from './popup/Popup'
import './App.css'
import HistoryIcon from './assets/history-icon.png'
import History from './history/History'


export default function App() {
  const {
    countDown,
    textInput,
    status,
    handleKeyDown,
    currInput,
    setCurrInput,
    start,
    disableState,
    words,
    correct,
    incorrect,
    getCharClass,
    openHistory,
    openHistoryState,
    historyState,
    deleteAllHistory
  } = useLogic()

  return (
    <div className="App">
      <img 
        src={HistoryIcon} 
        alt="History icon"
        className='history-icon'
        onClick={openHistory}
      />

      {
        openHistoryState && 
        <History 
          openHistory={openHistory}
          historyState={historyState}
          deleteAllHistory={deleteAllHistory}
        />
      }

      <h2>Time remaining: {countDown} s</h2>

      <div className="input-info-conatiner">
        <input 
          ref={textInput} 
          disabled={status !== "started"} 
          type="text" 
          className="input" 
          onKeyDown={handleKeyDown} 
          value={currInput} 
          onChange={(e) => setCurrInput(e.target.value)}
        />

        <Popup />
      </div>

      <button 
        onClick={start}
        disabled={disableState}
      >
        Start
      </button>

      {
        status === 'started' && 
        <div className='words-container'>
          {words.map((word, i) => (
            <span key={i}>
              <span>
                {word.split("").map((char, idx) => (
                  <span 
                    className={getCharClass(i, idx, char)} 
                    key={idx}
                  >
                    {char}
                  </span>
                )) }
              </span>
              <span> </span>
            </span>
          ))}
        </div>
      }
      {status === 'finished' && (
        <div className="results">
          <div>
            <p>Words per minute</p>
            <h3>{correct}</h3>
          </div>

          <div className='accuracy'>
            <p>Accuracy</p>
            {correct !== 0 ? (
              <h3>
                {Math.round((correct / (correct + incorrect)) * 100)}%
              </h3>
            ) : (
              <h3>0%</h3>
            )}
          </div>
        </div>
      )}

    </div>
  );
}