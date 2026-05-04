import { BasicGates } from './components/BasicGates'
import { ExpressionPlayground } from './components/ExpressionPlayground'
import './App.css'

function App() {

  return (
    <main>
      <header 
        className='bg-gray-800 text-white p-4 text-center rounded-b-lg shadow-md flex flex-col gap-2 mb-6'
      >
        <h1
          className='text-3xl'
        >Compuertas lógicas</h1>
        <p>Haz click para cambiar los switches de encendido y apagado.</p>
      </header>
      <BasicGates />
      <h2>Conversor de expresiones lógicas.</h2>
      <ExpressionPlayground />
    </main>
  )
}

export default App
