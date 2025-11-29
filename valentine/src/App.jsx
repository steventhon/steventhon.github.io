import { Router, Route } from './components/Router'
import Valentine from './screens/Valentine'
import TipScreen from './screens/TipScreen'
import Thanksgiving from './screens/Thanksgiving'

function App() {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <Router>
        <Route path="/" component={Valentine} />
        <Route path="/tip" component={TipScreen} />
        <Route path="/thanksgiving" component={Thanksgiving} />
      </Router>
    </div>
  )
}

export default App