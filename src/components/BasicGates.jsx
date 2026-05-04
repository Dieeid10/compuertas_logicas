import { Gate } from './Gate'

const GATES = [
  { id:'and',  label:'AND',  vars:['A','B'], fn: v => v[0] && v[1],       desc:'Ambas entradas deben ser 1' },
  { id:'or',   label:'OR',   vars:['A','B'], fn: v => v[0] || v[1],       desc:'Al menos una entrada en 1' },
  { id:'not',  label:'NOT',  vars:['A'],     fn: v => !v[0],              desc:'Invierte la entrada' },
  { id:'nand', label:'NAND', vars:['A','B'], fn: v => !(v[0] && v[1]),    desc:'Inverso del AND' },
  { id:'nor',  label:'NOR',  vars:['A','B'], fn: v => !(v[0] || v[1]),    desc:'Inverso del OR' },
  { id:'xor',  label:'XOR',  vars:['A','B'], fn: v => v[0] !== v[1],      desc:'Solo una entrada en 1' },
];

export const BasicGates = () => {
    return (
        <>
            <h2>Compuestas básicas.</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
                {
                    GATES.map(gate => (
                        <Gate key={gate.id} label={gate.label} vars={gate.vars} fn={gate.fn} desc={gate.desc} />
                    ))
                }
            </section>
        </>
    )
}