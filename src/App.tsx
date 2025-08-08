
import './App.css'
import Header from './components/Header'
import Loading from './components/Loading'
import Carousel from './components/Loading/Carousel'

function App() {

  return (
    <div className='app' style={{ overflow: 'auto', height: '100vh' }}>
    <Loading />
   <Header />
   
    </div>
  )
}

export default App
