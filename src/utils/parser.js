export function tokenize(raw) {
  const tokens = []
  let s = raw.toLowerCase().replace(/\s+/g, ' ').trim()
  let i = 0

  while (i < s.length) {
    if (s[i] === ' ') { i++; continue }
    if (s[i] === '(') { tokens.push({ t: '(' }); i++; continue }
    if (s[i] === ')') { tokens.push({ t: ')' }); i++; continue }

    if (s.slice(i, i + 3) === 'and' && !/[a-z]/.test(s[i + 3] ?? '')) { tokens.push({ t: 'and' }); i += 3; continue }
    if (s.slice(i, i + 2) === 'or' && !/[a-z]/.test(s[i + 2] ?? '')) { tokens.push({ t: 'or' }); i += 2; continue }
    if (s.slice(i, i + 3) === 'not' && !/[a-z]/.test(s[i + 3] ?? '')) { tokens.push({ t: 'not' }); i += 3; continue }

    if (/[a-z]/.test(s[i])) { tokens.push({ t: 'var', v: s[i] }); i++; continue }

    throw new Error(`carácter inválido: "${s[i]}"`)
  }

  return tokens
}

export function parse(tokens) {
  let pos = 0
  const peek = () => tokens[pos]
  const eat = () => tokens[pos++]

  function parseOr() {
    let node = parseAnd()
    while (peek()?.t === 'or') {
      eat()
      node = { t: 'or', l: node, r: parseAnd() }
    }
    return node
  }

  function parseAnd() {
    let node = parseNot()
    while (peek()?.t === 'and') {
      eat()
      node = { t: 'and', l: node, r: parseNot() }
    }
    return node
  }

  function parseNot() {
    if (peek()?.t === 'not') {
      eat()
      return { t: 'not', c: parseNot() }
    }
    return parseAtom()
  }

  function parseAtom() {
    const tk = peek()
    if (!tk) throw new Error('expresión incompleta')

    if (tk.t === 'var') {
      eat()
      return { t: 'var', v: tk.v }
    }

    if (tk.t === '(') {
      eat()
      const node = parseOr()
      if (peek()?.t !== ')') throw new Error('falta paréntesis de cierre )')
      eat()
      return node
    }

    throw new Error(`token inesperado: "${tk.t}"`)
  }

  const tree = parseOr()

  if (pos < tokens.length) throw new Error(`token extra: "${tokens[pos].t}"`)
    
  return tree
}

export function getVars(tree) {
  const found = new Set()
  const walk = node => {
    if (node.t === 'var') found.add(node.v)
    else if (node.t === 'not') walk(node.c)
    else { walk(node.l); walk(node.r) }
  }
  walk(tree)
  return [...found].sort()
}

export function evaluate(tree, env) {
  if (tree.t === 'var') return env[tree.v]
  if (tree.t === 'not') return !evaluate(tree.c, env)
  if (tree.t === 'and') return evaluate(tree.l, env) && evaluate(tree.r, env)
  if (tree.t === 'or') return evaluate(tree.l, env) || evaluate(tree.r, env)
}