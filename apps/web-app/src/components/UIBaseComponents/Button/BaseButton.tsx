import React, { FC, PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren<any> {
    onClick?: () => void
    className?: string
    disabled?: boolean
    bold?: boolean
    color?: 'orange' | 'blue' | 'grey' | 'red'
    type?: 'button' | 'submit' | 'reset'
}

export const BaseButton: FC<IProps> = (props) => {
  let bgColorStyle = ''
  if (props.color === 'grey') {
    bgColorStyle = 'text-black bg-grey-100 hover:bg-grey-300'
  } else if (props.color === 'orange') {
    bgColorStyle = 'text-blue-900 bg-orange-700 hover:bg-orange-900'
  } else if (props.color === 'blue') {
    bgColorStyle = 'text-white bg-blue-700 hover:bg-blue-900'
  } else if (props.color === 'red') {
    bgColorStyle = 'text-white bg-red-700 hover:bg-red-900'
  }

  const fontStyle = props.bold ? 'font-bold' : ''

  const disabledStyle = props.disabled ? 'cursor-not-allowed disabled:bg-grey-300 disabled:text-grey-700' : ''

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`shadow-md rounded-lg duration-100 ${fontStyle} ${disabledStyle} ${bgColorStyle} ${props.className}`}
    >
      {props.children}
    </button>
  )
}

BaseButton.defaultProps = {
  bold: true,
  color: 'orange',
  type: 'button',
  className: '',
  disabled: false
}