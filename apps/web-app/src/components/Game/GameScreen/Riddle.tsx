import React, { FC } from 'react'
import { IRiddle } from '~/infrastructure/riddle/Riddle.types'

interface IProps {
    riddle: IRiddle
}

export const Riddle: FC<IProps> = (props) => {
  return (
    <div>
      <span>{props.riddle.id}</span>
      <img src={props.riddle.riddlePhotoUrl} alt="kvízová fotka"/>
    </div>
  )
}