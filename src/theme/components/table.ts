import { tableAnatomy as parts } from '@chakra-ui/anatomy'
import {
	createMultiStyleConfigHelpers,
	defineStyle,
} from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'

const { defineMultiStyleConfig, definePartsStyle } =
	createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
	table: {
		fontVariantNumeric: 'lining-nums tabular-nums',
		borderCollapse: 'collapse',
	},
	th: {
		fontFamily: 'heading',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: 'wider',
		textAlign: 'start',
	},
	td: {
		textAlign: 'start',
	},
	caption: {
		mt: 4,
		fontFamily: 'heading',
		textAlign: 'center',
		fontWeight: 'medium',
	},
})

const numericStyles = defineStyle({
	'&[data-is-numeric=true]': {
		textAlign: 'end',
	},
})

const variantSimple = definePartsStyle((props) => {
	const { colorScheme: c } = props

	return {
		th: {
			color: mode('gray.600', 'gray.400')(props),
			borderBottom: '1px',
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		td: {
			borderBottom: '1px',
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		caption: {
			color: mode('gray.600', 'gray.100')(props),
		},
		tfoot: {
			tr: {
				'&:last-of-type': {
					th: { borderBottomWidth: 0 },
				},
			},
		},
	}
})

const variantStripe = definePartsStyle((props) => {
	const { colorScheme: c } = props

	return {
		th: {
			color: mode('gray.600', 'gray.400')(props),
			borderBottom: '1px',
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		td: {
			borderBottom: '1px',
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		caption: {
			color: mode('gray.600', 'gray.100')(props),
		},
		tbody: {
			tr: {
				'&:nth-of-type(odd)': {
					'th, td': {
						borderBottomWidth: '1px',
						borderColor: mode(`${c}.100`, `${c}.700`)(props),
					},
					td: {
						background: mode(`${c}.100`, `${c}.700`)(props),
					},
				},
			},
		},
		tfoot: {
			tr: {
				'&:last-of-type': {
					th: { borderBottomWidth: 0 },
				},
			},
		},
	}
})

const variantShori = definePartsStyle((props) => {
	const simpleVariant = variantSimple(props)
	return {
		...simpleVariant,
		'thead tr': {
			position: 'sticky',
			top: -0,
		},
		th: {
			bg: 'white',
			height: '38px',
			color: 'black',
			borderTop: '1px',
			borderBottom: '1px',
			borderColor: 'brand.clonika.gray',
			...numericStyles,
		},
		td: {
			borderBottom: '1px',
			borderColor: 'brand.clonika.gray',
			padding: '0.4rem 1.4rem',
			...numericStyles,
		},
	}
})

const variantQuanta = definePartsStyle((props) => {
	const simpleVariant = variantSimple(props)

	return {
		...simpleVariant,
		table: {
			'thead tr': {
				position: 'sticky',
				top: -2,
				py: 2,
				bg: 'white',
			},
		},
		th: {
			bg: 'white',
			color: 'brand.clonika.blue.700',
			borderTop: '1px',
			borderBottom: '1px',
			borderColor: 'brand.clonika.blue.700',
			...numericStyles,
		},
		td: {
			bg: 'white',
			borderBottom: '1px',
			borderColor: 'brand.quanta.gray',
			padding: '0.4rem 1.4rem',
			...numericStyles,
		},
	}
})
const variantInbox = definePartsStyle((props) => {
	const simpleVariant = variantSimple(props)

	return {
		...simpleVariant,
		tr: {
			maxWidth: '100%',
		},
		th: {
			bg: 'white',
			color: 'brand.clonika.blue.700',
			borderTop: '1px',
			borderBottom: '1px',
			minHeight: '45px',
			borderColor: 'brand.clonika.gray',
			...numericStyles,
		},
		td: {
			bg: 'white',
			borderBottom: '1px',
			borderColor: 'brand.clonika.gray',
			minHeight: '45px',
			...numericStyles,
		},
	}
})

const variants = {
	simple: variantSimple,
	striped: variantStripe,
	shori: variantShori,
	quanta: variantQuanta,
	unstyled: defineStyle({}),
	inbox: variantInbox,
}

const sizes = {
	sm: definePartsStyle({
		th: {
			px: '4',
			py: '1',
			lineHeight: '4',
			fontSize: 'xs',
		},
		td: {
			px: '4',
			py: '2',
			fontSize: 'sm',
			lineHeight: '4',
		},
		caption: {
			px: '4',
			py: '2',
			fontSize: 'xs',
		},
	}),
	md: definePartsStyle({
		th: {
			px: '6',
			py: '3',
			lineHeight: '4',
			fontSize: 'xs',
		},
		td: {
			px: '6',
			py: '4',
			lineHeight: '5',
		},
		caption: {
			px: '6',
			py: '2',
			fontSize: 'sm',
		},
	}),
	lg: definePartsStyle({
		th: {
			px: '8',
			py: '4',
			lineHeight: '5',
			fontSize: 'sm',
		},
		td: {
			px: '8',
			py: '5',
			lineHeight: '6',
		},
		caption: {
			px: '6',
			py: '2',
			fontSize: 'md',
		},
	}),
}

export const tableTheme = defineMultiStyleConfig({
	baseStyle,
	variants,
	sizes,
	defaultProps: {
		variant: 'simple',
		size: 'md',
		colorScheme: 'gray',
	},
})
