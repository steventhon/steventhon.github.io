import React, { useState } from 'react'
import './App.css'

// Simple router component
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
  React.useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }
  
  return React.Children.map(children, child => 
    React.cloneElement(child, { currentPath, navigate })
  )
}

const Route = ({ path, component: Component, currentPath, navigate }) => {
  return currentPath === path ? <Component navigate={navigate} /> : null
}

// Tip component
const TipScreen = ({ navigate }) => {
  const [showThankYou, setShowThankYou] = useState(false)
  const [selectedTip, setSelectedTip] = useState(null)

  const handleTipSelect = (percentage) => {
    setSelectedTip(percentage)
    if (percentage === 0) {
      setShowThankYou(true)
    } else {
      setShowThankYou(true)
    }
  }

  const getTipGif = () => {
    if (selectedTip === 0) {
      return "https://media1.tenor.com/m/yKjcNbCzNUoAAAAd/yessir-4t.gif"
    } else if (selectedTip === 500) {
      return "https://media.tenor.com/0BN3r1Cil8gAAAAj/poki-hamster.gif"
    } else {
      return "https://media1.tenor.com/m/ITL556MnC1wAAAAC/coquette-hampter.gif"
    }
  }

  const getThankYouMessage = () => {
    if (selectedTip === 0) {
      return "I'll never let you pass my class."
    } else if (selectedTip === 500) {
      return "WOW! Thank you for the amazing $500 tip! 🎉"
    } else {
      return `Thank you for the ${selectedTip}% tip! 💝`
    }
  }

  return (
    <div className="valentine-container">
      {showThankYou ? (
        <>
          <img
            className="h-[200px]"
            alt="tip response"
            src={getTipGif()}
          />
          <div className="text-4xl font-bold my-4 text-center">
            {getThankYouMessage()}
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => {
                setShowThankYou(false)
                setSelectedTip(null)
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tip Again
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            alt="hamster with money"
            src="https://media1.tenor.com/m/85lIC6AmudgAAAAd/poki-hammy.gif"
          />
          <h1 className="text-4xl my-4 text-center">Show some love with a tip! 💝</h1>
          
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => handleTipSelect(20)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                20%
              </button>
              <button 
                onClick={() => handleTipSelect(25)}
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                25%
              </button>
              <button 
                onClick={() => handleTipSelect(30)}
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                30%
              </button>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <button 
                onClick={() => handleTipSelect(500)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Custom Tip
              </button>
            </div>
            
            <button 
              onClick={() => handleTipSelect(0)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg"
            >
              No Tip
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Original Valentine component
const Valentine = ({ navigate }) => {
  const [count, setCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  
  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Pleaseeee",
    "Hunnooooo",
    "Heyyyy",
    ">:(",
    "Don't do this to me...",
    "I'm getting sad...",
    "I'm gonna cry...",
    "You're breaking my heart :(",
    "D:",
    "Noooooo",
    "Whyyyy",
    ":(",
    ":(((",
    "Whattt",
    "...",
    "So mean",
  ]
  
  const yesButtonSize = count * 60 + 16

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
            className="h-[200px]"
            alt="hamsters kissing"
            src="https://media1.tenor.com/m/xBc5aL-1d88AAAAd/hamster-kiss.gif"
          />
          
          <div>
            <img
              className="h-[200px]"
              alt="hamster eating cheese"
              src="https://64.media.tumblr.com/94b15d764d1e6ceb8a06f7fdc89a4874/tumblr_nx3n7j9D1l1rluhlpo1_400.gif"
            />
          </div>

          <div className="text-4xl font-bold my-4 text-center">Ok yay!!!</div>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload(false)} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          {count === 0 ? (
            <img
              className="h-[200px]"
              alt="shy hamster"
              src="https://blog.omlet.us/wp-content/uploads/sites/6/2024/07/Hamster-sat-down-eating-950x629.jpg"
            />
          ) : (
            <img
              className="h-[200px]"
              alt="awkward hamster"
              src="https://media1.tenor.com/m/yKjcNbCzNUoAAAAd/yessir-4t.gif"
            />
          )}
          <h1 className="text-4xl my-4 text-center">Will you be the cheese to my ham?</h1>
          <div className="space-x-4">
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button 
              onClick={handleNoClick} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Main App component
function App() {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <Router>
        <Route path="/" component={Valentine} />
        <Route path="/tip" component={TipScreen} />
      </Router>
    </div>
  )
}

export default App