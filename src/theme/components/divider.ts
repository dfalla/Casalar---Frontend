import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const sizes = {
	sm: defineStyle({
		borderWidth: '3px',
	}),
}

export const dividerTheme = defineStyleConfig({
	sizes,
	defaultProps: {
		size: 'sm',
		variant: 'solid',
	},
})