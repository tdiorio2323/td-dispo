import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    const includeBar = false
    const maybeBar = includeBar ? 'bar' : undefined
    expect(cn('foo', maybeBar, 'baz')).toBe('foo baz')

    const showBar = true
    const maybeBar2 = showBar ? 'bar' : undefined
    expect(cn('foo', maybeBar2)).toBe('foo bar')
  })

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, 'bar', null)).toBe('foo bar')
  })

  it('merges tailwind classes with conflicts', () => {
    // tailwind-merge should keep the latter class when there's a conflict
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
    expect(cn(['foo'], 'bar')).toBe('foo bar')
  })

  it('handles duplicate classes', () => {
    // clsx and tailwind-merge handle duplicates, but order may vary
    const result = cn('foo', 'bar', 'foo')
    expect(result).toContain('foo')
    expect(result).toContain('bar')
  })
})
