import { useState } from 'react'
import './App.css'

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Pookie please",
  ">:(",
  "Don't do this to me...",
  "I'm getting sad...",
  "I'm gonna cry...",
  "You're breaking my heart :(",
  "WHYYYYY",
  "STAHPPP",
]

function App() {
  const [count, setCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const yesButtonSize = count * 40 + 16

  function handleNoClick() {
    setCount(count + 1)
  }

  function getNoButtonText() {
    return phrases[Math.min(count, phrases.length - 1)]
  }

  return (
    <div className="valentine-container">
      {yesPressed ? (
        <>
        <img
        class="h-[200px]"
        alt="bears kissing"
        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"></img>
        <div class="text-4xl font-bold my-4 text-center">Ok yay!!!</div>
        <button onClick={() => window.location.reload(false)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
        </>
      ) : (
        <>
        <img
        class="h-[200px]"
        alt="bear with hearts"
        src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"></img>
        <h1 class="text-4xl my-4 text-center">Will you be my Valentine?</h1>
        <div>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          style={{ fontSize: yesButtonSize }}
          onClick={() => setYesPressed(true)}>Yes</button>
          <button onClick={handleNoClick} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">{getNoButtonText()}</button>
        </div>
        </>
      )}
    </div>
  )
}

export default App
