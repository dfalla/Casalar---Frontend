import { ThemeConfig } from '@chakra-ui/theme'
import { extendTheme } from '@chakra-ui/theme-utils'
import { components } from './components'
import { foundations } from './foundations'


const config: ThemeConfig = {
	useSystemColorMode: false,
	initialColorMode: 'light',
	cssVarPrefix: 'portals-ntt-data',
}

const breakpoints = {
	sm: '320px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
	'2xl': '1536px',
  }

export const theme = extendTheme({
	...config,
	components,
	...foundations,
	breakpoints,
	styles: {
		global: {
			body: {
				bg: '#F6F6F6',
			},
		},
	},
})

export default theme