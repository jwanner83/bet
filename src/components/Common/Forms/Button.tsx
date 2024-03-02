import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
                                 children,
                                 className,
                                 ...props
                               }: Props) {
  return (
    <button
      className={`font-medium transition bg-white text-black hover:scale-105 active:scale-95 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 text-sm px-3 py-2 border border-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}