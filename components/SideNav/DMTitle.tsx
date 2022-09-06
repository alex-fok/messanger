import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../common/Button'
import type { DMTitleFC } from '../../types/components/sideNav'

const DMTitle:DMTitleFC = ({createChat}) => {
  return (
    <summary className='text-gray-400 text-base font-light mb-2'>
      <span className='select-none'>Direct Messages
        <span className='float-right'>
          <Button
            className='w-6 h-6 rounded-full font-black text-xs text-gray-400 hover:bg-gray-400 hover:text-gray-50'
            onClick={createChat}
          ><FontAwesomeIcon icon={['fas','plus']}/>
          </Button>
        </span>
      </span>
    </summary>
  )
}

export default DMTitle
