import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { BaseButton } from '~/components/UIBaseComponents/Button/BaseButton'

interface IProps {
    onClick: () => void
}

export const PressToPlay: FC<IProps> = (props) => {
  return (
    <div className={'h-full flex flex-col justify-center items-center max-w-2xl mx-auto'}>
      <p className={'text-xl'}> Kliknutím na tlačítko Start spustíte hru. Odpovědět můžete do dnešní půlnoci. Více o hodnocení se můžete dozvědět v <Link to={'/pravidla'} className={'text-orange-500 hover:text-orange-700 transition- duration-100 hover:underline'}>pravidlech</Link>. </p>
      <BaseButton
        color={'orange'}
        className={'my-4 py-3 px-7 mx-auto hover:scale-105'}
        onClick={props.onClick}
      >
        <span className={'text-4xl'}>START</span>
      </BaseButton>
    </div>
  )
}