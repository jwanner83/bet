import { HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {
  width: 'full' | 'medium' | 'small'
  children: ReactNode
}

export default function Box({ width, children, className, ...props }: Props) {
  let widthClasses = 'w-full'

  switch (width) {
    case 'full':
      widthClasses = 'w-full'
      break
    case 'medium':
      widthClasses = 'max-w-[1300px] m-auto'
      break
    case 'small':
      widthClasses = 'max-w-[500px] m-auto'
      break
  }

  return (
    <div className={`${widthClasses} ${className} px-8`} {...props}>
  {children}
  </div>
)
}