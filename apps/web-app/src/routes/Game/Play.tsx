import React from 'react'
import { Link } from 'react-router-dom'
import { BaseButton } from '~/components/UIBaseComponents/Button/BaseButton'

export const Play = () => {
  return (
    <div className={'h-full flex flex-col justify-center items-center px-8'}>
      <p className={'text-xl'}> Kliknutím na tlačítko Start spustíte hru. Odpovědět můžete do dnešní půlnoci. Více
                o hodnocení se můžete dozvědět v <Link to={'/pravidla'}
        className={'text-orange-500 hover:text-orange-700 duration-100 hover:underline'}>pravidlech</Link>.
      </p>
      <BaseButton color={'orange'} className={'my-4 py-3 px-7 mx-auto hover:scale-105'}>
        <span className={'text-4xl'}>START</span>
      </BaseButton>
    </div>
  )
}