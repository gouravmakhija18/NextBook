import { Hamburger } from './svg-icons'
import { useContext } from 'react'
import SideBarContext from './store/sidebar-context'
import { _ } from 'components/text'

const SideBarToggler = () => {
  const sideBarCtx = useContext(SideBarContext)

  return (
    <div className='flex ml-3 md:hidden'>
      <button
        onClick={sideBarCtx.toggleSideBar}
        title={_('Table Of Contents')}
        className='shadow bg-gray-100 text-gray-600 dark:text-gray-400 dark:bg-gray-700 rounded p-1 focus:outline-none w-8 h-8'
      >
        <Hamburger />
      </button>
    </div>
  )
}

export default SideBarToggler
