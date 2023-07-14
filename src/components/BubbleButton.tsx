import React, { ComponentProps, ReactNode } from 'react'

export interface BubbleButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

const BubbleButton = (props: BubbleButtonProps) => {
  return (
    <button
      className='p-2 text-zinc-600 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zubc-50 hover:bg-zinc-100 data-[active=true]:text-violet-400' {...props}
    />
  )
}

export default BubbleButton