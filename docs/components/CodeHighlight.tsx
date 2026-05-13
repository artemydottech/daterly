import { Fragment } from 'react'
import styles from './CodeHighlight.module.css'

const KEYWORDS = new Set([
  'import',
  'from',
  'const',
  'let',
  'var',
  'export',
  'default',
  'return',
  'async',
  'await',
  'if',
  'else',
  'function',
  'class',
  'new',
  'true',
  'false',
  'null',
  'undefined',
  'type',
  'interface',
])

type Token = { className: string; value: string }

function peekNonSpace(src: string, from: number): string | undefined {
  let j = from
  while (j < src.length && (src[j] === ' ' || src[j] === '\t')) j++
  return src[j]
}

function tokenize(src: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  let inJsxTag = false

  const push = (className: string, value: string) => {
    if (value) tokens.push({ className, value })
  }

  while (i < src.length) {
    const c = src[i]

    // newline
    if (c === '\n') {
      push('', '\n')
      i++
      continue
    }

    // whitespace
    if (c === ' ' || c === '\t') {
      let j = i
      while (j < src.length && (src[j] === ' ' || src[j] === '\t')) j++
      push('', src.slice(i, j))
      i = j
      continue
    }

    // line comment
    if (c === '/' && src[i + 1] === '/') {
      let j = i
      while (j < src.length && src[j] !== '\n') j++
      push(styles.comment, src.slice(i, j))
      i = j
      continue
    }

    // string literal
    if (c === "'" || c === '"' || c === '`') {
      const quote = c
      let j = i + 1
      while (j < src.length && src[j] !== quote) {
        if (src[j] === '\\') j++
        j++
      }
      push(styles.string, src.slice(i, j + 1))
      i = j + 1
      continue
    }

    // self-closing JSX
    if (c === '/' && src[i + 1] === '>') {
      push(styles.tag, '/>')
      inJsxTag = false
      i += 2
      continue
    }

    // JSX tag open: < or </
    if (c === '<' && /[A-Za-z/]/.test(src[i + 1] ?? '')) {
      push(styles.tag, '<')
      i++
      if (src[i] === '/') {
        push(styles.tag, '/')
        i++
      }
      let j = i
      while (j < src.length && /[A-Za-z0-9_$.]/.test(src[j])) j++
      const name = src.slice(i, j)
      if (name) {
        const cls = /^[A-Z]/.test(name) ? styles.component : styles.htmlTag
        push(cls, name)
      }
      inJsxTag = true
      i = j
      continue
    }

    // JSX tag close
    if (c === '>') {
      push(styles.tag, '>')
      inJsxTag = false
      i++
      continue
    }

    // identifier / keyword
    if (/[A-Za-z_$]/.test(c)) {
      let j = i
      while (j < src.length && /[A-Za-z0-9_$]/.test(src[j])) j++
      const word = src.slice(i, j)
      const next = peekNonSpace(src, j)
      let cls = styles.default
      if (KEYWORDS.has(word)) cls = styles.keyword
      else if (/^[A-Z]/.test(word)) cls = styles.component
      else if (inJsxTag && next === '=') cls = styles.prop
      else if (next === '(') cls = styles.fn
      push(cls, word)
      i = j
      continue
    }

    // spread / dots
    if (c === '.' && src[i + 1] === '.' && src[i + 2] === '.') {
      push(styles.punct, '...')
      i += 3
      continue
    }

    // braces inside JSX → mark as JSX expression delimiters
    if ((c === '{' || c === '}') && inJsxTag) {
      push(styles.tag, c)
      i++
      continue
    }

    // punctuation
    push(styles.punct, c)
    i++
  }
  return tokens
}

export default function CodeHighlight({ code }: { code: string }) {
  const tokens = tokenize(code)
  return (
    <>
      {tokens.map((t, idx) => (
        <Fragment key={idx}>
          {t.className ? (
            <span className={t.className}>{t.value}</span>
          ) : (
            t.value
          )}
        </Fragment>
      ))}
    </>
  )
}
