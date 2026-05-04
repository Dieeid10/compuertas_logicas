import { useState } from 'react'
import { tokenize, parse, getVars, evaluate } from '../utils/parser'
import { ExpressionInput } from './ExpressionInput'
import { TruthTable } from './TruthTable'

export function ExpressionPlayground() {
  const [raw, setRaw] = useState('q and (p or r)')
  const [tree, setTree] = useState(null)
  const [vars, setVars] = useState([])
  const [env, setEnv] = useState({})
  const [error, setError] = useState('')

  function handleSubmit() {
    setError('')
    try {
      const tokens  = tokenize(raw)
      const parsed  = parse(tokens)
      const newVars = getVars(parsed)

      setEnv(prev => {
        const next = {}
        newVars.forEach(v => { next[v] = prev[v] ?? false })
        return next
      })

      setTree(parsed)
      setVars(newVars)
    } catch (e) {
      setError(e.message)
      setTree(null)
      setVars([])
    }
  }

  function toggleVar(v) {
    setEnv(prev => ({ ...prev, [v]: !prev[v] }))
  }

  const result = tree ? evaluate(tree, env) : null

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5">

      <ExpressionInput
        value={raw}
        onChange={setRaw}
        onSubmit={handleSubmit}
        error={error}
      />

      {tree && (
        <>
          <div className="flex items-center gap-3 flex-wrap mb-5">

            <div className="flex flex-col gap-2">
              {vars.map(v => (
                <button
                  key={v}
                  onClick={() => toggleVar(v)}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-xs font-mono font-bold text-gray-500 w-3 uppercase">{v}</span>
                  <div className={`relative w-9 h-5 rounded-full border transition-colors duration-200
                    ${env[v]
                      ? 'bg-emerald-500 border-emerald-600'
                      : 'bg-gray-100 border-gray-300 group-hover:border-gray-400'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200
                      ${env[v] ? 'left-4' : 'left-0.5'}`}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className={`h-0.5 w-6 rounded transition-colors ${result ? 'bg-emerald-500' : 'bg-gray-200'}`} />

            <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors
              ${result
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              {raw.trim()}
            </div>

            <div className={`h-0.5 w-6 rounded transition-colors ${result ? 'bg-emerald-500' : 'bg-gray-200'}`} />

            <span className={`text-3xl transition-all duration-200 ${result ? '' : 'grayscale brightness-50'}`}>
              💡
            </span>

            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors
              ${result
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              {result ? '1 — encendido' : '0 — apagado'}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <TruthTable tree={tree} vars={vars} currentEnv={env} />
          </div>
        </>
      )}
    </section>
  )
}