export function ExpressionInput({ value, onChange, onSubmit, error }) {

    function handleKeyDown(e) {
        if (e.key === 'Enter') onSubmit()
    }

    return (
        <div className="mb-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="ej: a and (b or not c)"
                    className="flex-1 font-mono text-sm px-3 py-2 rounded-lg border border-gray-200
                        bg-gray-50 text-gray-800 outline-none
                        focus:border-emerald-400 focus:bg-white transition-colors"
                />
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 bg-gray-900 text-white text-xs font-bold tracking-wider
                        rounded-lg hover:bg-gray-700 active:scale-95 transition-all"
                >
                    evaluar
                </button>
            </div>

            {error && (
                <p className="mt-2 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <p className="mt-2 text-xs text-gray-400">
                variables: letras simples · operadores: and, or, not · paréntesis permitidos
            </p>
        </div>
    )
}