import type { DialogFC } from 'types/components/dialog'
const Dialog:DialogFC = ({show, onClose, children}) => {
  return (
    show
    ? <div className='flex fixed inset-0 items-center justify-center z-10 sm:p-4 bg-gray-800 bg-opacity-50'>''
        <article className='flex flex-col inline-block w-96 px-5 py-3 rounded-md bg-gray-100'>
          <span className='my-2 self-end font-thin text-3xl leading-5 cursor-pointer' onClick={() => onClose()}>&times;</span>
          {children}
        </article>
      </div>
    : null
  )
}
export default Dialog
