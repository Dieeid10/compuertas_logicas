import { BasicGates } from './components/BasicGates'
import { ExpressionPlayground } from './components/ExpressionPlayground'
import './App.css'

function App() {

  return (
    <main>
      <header 
        className='bg-gray-800 text-white p-4 text-center rounded-b-lg shadow-md'
      >
        <h1
          className=''
        >Compuertas lógicas</h1>
        <p>Haz click para cambiar los switches de encendido y apagado.</p>
      </header>
      <BasicGates />
      <ExpressionPlayground />
    </main>
  )
}

export default App
