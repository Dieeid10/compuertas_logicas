import { evaluate } from '../utils/parser'

export function TruthTable({ tree, vars, currentEnv }) {

    const rows = []
    for (let i = 0; i < 2 ** vars.length; i++) {
        const env = {}
        vars.forEach((v, j) => {
            env[v] = Boolean(i >> (vars.length - 1 - j) & 1)
        })
        rows.push({ env, result: evaluate(tree, env) })
    }

    const isActive = env => vars.every(v => env[v] === currentEnv[v])

    return (
        <table className="w-full text-xs font-mono border-collapse mt-2">
            <thead>
                <tr className="border-b border-gray-100">
                    {vars.map(v => (
                        <th key={v} className="text-left py-2 px-3 text-gray-400 font-semibold tracking-widest uppercase">
                            {v}
                        </th>
                    ))}
                    <th className="text-left py-2 px-3 text-gray-400 font-semibold tracking-widest uppercase">
                        resultado
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.map(({ env, result }, i) => (
                    <tr
                        key={i}
                        className={isActive(env) ? 'bg-emerald-50' : 'hover:bg-gray-50'}
                    >
                        {vars.map(v => (
                            <td key={v} className={`py-1.5 px-3 ${isActive(env) ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                                {env[v] ? '1' : '0'}
                            </td>
                        ))}
                        <td className={`py-1.5 px-3 font-bold ${result ? 'text-emerald-500' : 'text-gray-300'}`}>
                            {result ? '1' : '0'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}