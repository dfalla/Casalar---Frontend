import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
	// define the part you're going to style
	button: {
		// this will style the MenuButton component
		fontWeight: 'medium',
		bg: 'teal.500',
		color: 'gray.200',
		_hover: {
			bg: 'teal.600',
			color: 'white',
		},
	},
	list: {
		// this will style the MenuList component
		minHeight: 'max-content',
		minWidth: 'max-content',
	},
	item: {
		// this will style the MenuItem and MenuItemOption selectors
		color: 'gray.800',
		_hover: {
			bg: 'gray.200',
		},
		_focus: {
			bg: 'gray.200',
		},
	},
	groupTitle: {
		// this will style the text defined by the title prop
		// in the MenuGroup and MenuOptionGroup selectors
		textTransform: 'uppercase',
		color: 'black',
		textAlign: 'center',
		letterSpacing: 'wider',
		opacity: '0.7',
	},
	command: {
		// this will style the text defined by the command
		// prop in the MenuItem and MenuItemOption selectors
		opacity: '0.8',
		fontFamily: 'mono',
		fontSize: 'sm',
		letterSpacing: 'tighter',
		pl: '4',
	},
	divider: {
		// this will style the MenuDivider component
		my: '4',
		borderColor: 'white',
		borderBottom: '2px dotted',
	},
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })
