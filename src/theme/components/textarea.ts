import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { SafeAny } from '../../common'

const baseStyle = defineStyle({
	padding: '7px 13px',
	resize: 'none',
})

const variants = {
	outline: defineStyle({
		border: '1px solid',
		// borderColor: 'brand.clonika.blue.600',
	}),
}

export const textareaTheme = defineStyleConfig({
	baseStyle,
	variants,
	defaultProps: {
		size: 'md',
		errorBorderColor: 'brand.error',
	},
} as SafeAny)
