export default function Thanksgiving({ navigate }) {
  return (
    <div className="thanksgiving-container max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-orange-800 mb-2">Thanksgiving 2025</h1>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <img
          className="h-[150px] rounded-lg shadow-md"
          alt="thanksgiving hamster"
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenliZ3k5bmRnNjh5MmlyZjA3dGEyNnJwZnJyNWZvaWUwNzM0M2ZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lFnkNYk1hcT1II/giphy.gif"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-semibold text-orange-700 mb-4">I'm Grateful For You</h2>

        <div className="prose prose-lg text-gray-700 space-y-4">
          <p>
            This Thanksgiving, I can't stop thinking about how grateful I am to have you in my life.
          </p>

          <p>
            I'm so grateful for all the little moments we share. I love our late-night talks, 
    the way you make me laugh even when I'm having the worst day, and how you 
    always know exactly what to say.</p>

          <p>
            Thank you for being patient with me, for believing in me when I don't believe 
    in myself, and for making every day better just by being in it.
          </p>

          <p>
            Whether it's our inside jokes, cute drawings, or vlogs, I'm thankful for you, for us, and for whatever the future holds as long as 
    we're together. I love you so much, and I can't wait to make more memories together.
          </p>

          <p className="text-orange-800 font-semibold text-xl mt-6">
            Happy Thanksgiving, my liddo ham 🐹
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
