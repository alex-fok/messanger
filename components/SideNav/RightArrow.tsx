import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ExpandBtnFC } from 'types/components/sideNav'

const RightArrow:ExpandBtnFC = ({className, isExpanded}) => {
  return (
    <span className={`${className} flex items-center justify-center w-6`}>
      <FontAwesomeIcon
        className={`transition ${isExpanded ? 'rotate-90': ''}`}
        icon={['fas', 'angle-right']}
      />
    </span>
  )
}

export default RightArrow
