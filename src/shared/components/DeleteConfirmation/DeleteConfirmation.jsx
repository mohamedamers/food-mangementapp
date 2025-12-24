import nodataimg from '../../../assets/images/nodata.png'
export default function DeleteConfirmation({deleteItem,name}) {
  return (
    <>
    <div className='text-center p-3'>
      <img src={nodataimg} alt="" />
      <h6 className='my-2'>Delete This {name} {deleteItem} ?</h6>
      <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>
    </div>
    </>
  )
}
