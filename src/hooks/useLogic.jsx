

import {useState, useEffect, useRef} from 'react'
import randomWords from 'random-words'
import { nanoid } from 'nanoid'
const NUMB_OF_WORDS = 200
const SECONDS = 60

export default function useLogic() {
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(SECONDS)
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [currChar, setCurrChar] = useState("")
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  const [disableState, setDisableState] = useState(false)
  const [openHistoryState, setOpenHistoryState] = useState(false)

  const [historyState, setHistoryState] = useState(
    JSON.parse(localStorage.getItem('data')) || []
  )
  const [countAttempt, setCountAttempt] = useState(1)
  const [typedWordsState, setTypedWordsState] = useState([])

  const textInput = useRef('')

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(historyState))
  }, [historyState])



  useEffect(() => {
    setWords(generateWords())
  }, [])

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
      setDisableState(true)
    }
    if (status === 'finished') {
      setDisableState(false)
      storeHistory()
    }
  }, [status])

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
  }

  function storeAttempt() {
    setCountAttempt(prevState => {
      if (prevState === prevState) {
        setTypedWordsState([])    // to remove all typed words for next attempt
        return prevState + 1
      }
      return prevState
    })

    return countAttempt
  }


  function storeHistory() {
    let percentOfCorrect = 0
    if (correct !== 0) {
      percentOfCorrect = Math.round((correct / (correct + incorrect)) * 100)
    } else {
      percentOfCorrect = 0
    }

    const data = {
        id: nanoid(),
        attempt: storeAttempt(),
        typedWords: typedWordsState,
        countOfCorrectWords: correct,
        accuracy: percentOfCorrect
    }
    setHistoryState(prevState => [...prevState, data])
  }

  function deleteAllHistory() {
    localStorage.clear()
    setHistoryState([])
  }



  function start() {
    if (status === 'finished') {
      setWords(generateWords())
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
    }

    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval)
            setStatus('finished')
            setCurrInput("")
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        })
      } ,  1000 )
    }
  }

  function handleKeyDown({keyCode, key}) {
    // space bar 
    if (keyCode === 32) {         // 32 === space
      checkMatch()
      setTypedWordsState(prevState => [...prevState, currInput])
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
    // backspace
    } else if (keyCode === 8) {   // 8 === remove
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'has-background-success'
      } else {
        return 'has-background-danger'
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'has-background-danger'
    } else {
      return ''
    }
  }

  function openHistory() {
    setOpenHistoryState(!openHistoryState)
  }

  return {
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
  }
}