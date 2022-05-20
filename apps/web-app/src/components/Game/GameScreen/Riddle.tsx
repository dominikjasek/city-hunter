import { IRiddle } from '@shared/types/Riddle/Riddle.types'
import React, { FC } from 'react'

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