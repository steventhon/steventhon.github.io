import { Router, Route } from './components/Router'
import Valentine from './screens/Valentine'
import TipScreen from './screens/TipScreen'

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