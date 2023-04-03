// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any

export type Apps = 'casalar'

export type Dictionary<T> = Record<string, T>

export type AnyFunction = (...args: SafeAny[]) => SafeAny

export type Updater = <T>(prev: T) => T

/**
 * @description
 * A type that represents a common option in the select component
 */
export type Option = {
	label: string
	value: string
}