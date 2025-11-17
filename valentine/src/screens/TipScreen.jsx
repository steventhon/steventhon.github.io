import { useState } from 'react'

export default function TipScreen({ navigate }) {
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
