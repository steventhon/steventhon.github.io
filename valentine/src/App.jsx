import { useState } from 'react'
import './App.css'
import sophiaImage from './assets/sophia.png';

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Pleaseeee",
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
        alt="hamsters kissing"
        src="https://media1.tenor.com/m/xBc5aL-1d88AAAAd/hamster-kiss.gif"></img>
        
        <div>
          <img
          class="h-[200px]"
          alt="hamster eating cheese"
          src="https://64.media.tumblr.com/94b15d764d1e6ceb8a06f7fdc89a4874/tumblr_nx3n7j9D1l1rluhlpo1_400.gif"
          />
        </div>

        <div class="text-4xl font-bold my-4 text-center">Ok yay!!!</div>
        <button onClick={() => window.location.reload(false)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
        </>
      ) : (
        <>
          {count == 0 ? (
        <img
        class="h-[200px]"
        alt="shy hamster"
        src="https://blog.omlet.us/wp-content/uploads/sites/6/2024/07/Hamster-sat-down-eating-950x629.jpg"></img>)
          :
        (<img
        class="h-[200px]"
        alt="awkward hamster"
        src="https://media1.tenor.com/m/yKjcNbCzNUoAAAAd/yessir-4t.gif"></img>)}
        <h1 class="text-4xl my-4 text-center">Will you be the cheese to my ham?</h1>
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
