import { ThemeConfig } from '@chakra-ui/theme'
import { extendTheme } from '@chakra-ui/theme-utils'
import { components } from './components'
import { foundations } from './foundations'


const config: ThemeConfig = {
	useSystemColorMode: false,
	initialColorMode: 'light',
	cssVarPrefix: 'portals-ntt-data',
}

export const theme = extendTheme({
	...config,
	components,
	...foundations,
	styles: {
		global: {
			body: {
				bg: '#F6F6F6',
			},
		},
	},
})

export default theme