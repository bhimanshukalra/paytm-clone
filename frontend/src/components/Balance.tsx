export const Balance = ({value}: {value: number}) => {
  return (
    <div className='flex' >
        <div className='font-bold text-lg' >Your balance</div>
        <div className='font-semibold text-lg ml-4' >₹ {value}</div>
    </div>
  )
}
