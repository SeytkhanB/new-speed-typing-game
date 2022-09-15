
import React from 'react'

export default function HistoryInfo(props) {
  const typedWords = props.item.typedWords.map(word => word).join(', ')

  return (
    <div className='history-info-container'>
      <h3>Attempt N{props.item.attempt}</h3>
      <h4>Typed words:</h4>
      <p>{typedWords}</p>
      <h4 className='count-of-words'>
        Count of correct words: 
        {props.item.countOfCorrectWords}
      </h4>
      <h4>Accuracy: {props.item.accuracy}%</h4>
      <hr />
    </div>
  )
}