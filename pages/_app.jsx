import { MDXProvider } from '@mdx-js/react'
import splitbee from '@splitbee/web'
import {
  SideBarContext,
  ThemeContext,
  ToggleSideBarContext,
  ToggleThemeContext,
} from 'components/context'
import {
  Blockquote,
  Code,
  CustomLink,
  Details,
  Image,
  Pre,
  Summary,
  Tab,
  Table,
  Tabs,
} from 'components/mdxcomponents'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import config from '../config.json'
import '../styles/halfmoon-variables.min.css'
import '../styles/global.css'

const components = {
  table: Table,
  a: CustomLink,
  img: Image,
  blockquote: Blockquote,
  pre: Pre,
  details: Details,
  summary: Summary,
  code: Code,
  tabs: Tabs,
  tab: Tab,
}

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development' && config.splitBeeToken) {
  splitbee.init({
    token: config.splitBeeToken,
  })
}

function MyApp({ Component, pageProps }) {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', config.defaultTheme)
  const [storedSideBar, setStoredSideBar] = useLocalStorage('sideBar', true)
  const [sideBar, setSideBar] = useState(storedSideBar)
  const [theme, setTheme] = useState(storedTheme)

  function toggleTheme() {
    setTheme((currentValue) => {
      return currentValue === 'dark' ? 'light' : 'dark'
    })
  }

  function toggleSideBar() {
    setSideBar((currentValue) => {
      return currentValue === true ? false : true
    })
  }

  useEffect(() => {
    const body = document.body
    if (theme === 'dark') {
      body.classList.add('dark-mode')
    } else {
      body.classList.remove('dark-mode')
    }
    setStoredTheme(theme)
  }, [theme])

  useEffect(() => {
    const pageWrapper = document.getElementsByClassName('page-wrapper')[0]
    if (sideBar) {
      pageWrapper.removeAttribute('data-sidebar-hidden')
    } else {
      pageWrapper.setAttribute('data-sidebar-hidden', 'hidden')
    }
    setStoredSideBar(sideBar)
  }, [sideBar])

  return (
    <ThemeContext.Provider value={theme}>
      <SideBarContext.Provider value={sideBar}>
        <ToggleThemeContext.Provider value={toggleTheme}>
          <ToggleSideBarContext.Provider value={toggleSideBar}>
            <MDXProvider components={components}>
              <Component {...pageProps} />
            </MDXProvider>
          </ToggleSideBarContext.Provider>
        </ToggleThemeContext.Provider>
      </SideBarContext.Provider>
    </ThemeContext.Provider>
  )
}

export default MyApp
