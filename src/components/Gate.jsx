import { useState } from "react"
import { LightBulb } from "../icon/LigthBulb"

export const Gate = ({ label, vars, fn, desc }) => {
    const [inputValues, setInputValues] = useState(vars.map(() => false))

    const result = fn(inputValues)

    function toggle(index) {
        setInputValues(inputValues.map((v, i) => i === index ? !v : v))
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
            <h3 className="text-sm font-bold tracking-widest text-gray-800 mb-1">{label}</h3>
            <p className="text-xs text-gray-400 mb-4">{desc}</p>

            <div className="flex items-center gap-3">

                <div className="flex flex-col gap-2">
                    {vars.map((varName, index) => (
                        <button
                            key={varName}
                            onClick={() => toggle(index)}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-mono font-semibold text-gray-500 w-3">
                                {varName}
                            </span>

                            <div className={`relative w-9 h-5 rounded-full border transition-colors duration-200
                                    ${inputValues[index]
                                    ? 'bg-emerald-500 border-emerald-600'
                                    : 'bg-gray-100 border-gray-300 group-hover:border-gray-400'
                                }`}
                            >
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200
                                    ${inputValues[index] ? 'left-4' : 'left-0.5'}`}
                                />
                            </div>
                        </button>
                    ))}
                </div>

                <div className={`h-0.5 w-5 rounded transition-colors duration-200 ${result ? 'bg-emerald-500' : 'bg-gray-200'}`}/>
                <div className={`px-2 py-1 rounded text-xs font-bold tracking-wider border transition-colors duration-200
                        ${result
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                >
                    {label}
                </div>
                <div className={`h-0.5 w-5 rounded transition-colors duration-200 ${result ? 'bg-emerald-500' : 'bg-gray-200'}`}/>
                <span className={`text-2xl transition-all duration-200 ${result ? '' : 'grayscale brightness-50'}`}>
                    <LightBulb />
                </span>

                <span className={`text-xs font-bold font-mono w-3 transition-colors duration-200 
                    ${result ? 'text-emerald-500' : 'text-gray-300'}`}
                >
                    {result ? '1' : '0'}
                </span>

            </div>
        </div>
    )
}