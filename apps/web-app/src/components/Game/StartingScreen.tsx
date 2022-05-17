import { Transition } from '@headlessui/react'
import React, { FC, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { BaseButton } from '~/components/UIBaseComponents/Button/BaseButton'

type GameState = 'START_SCREEN' | 'TIMEDOWN' | 'PLAYING'

export const StartingScreen: FC = () => {
  const [ gameState, setGameState ] = useState<GameState>('START_SCREEN')

  if (gameState === 'START_SCREEN') {
    return (
      <div className={'h-full flex flex-col justify-center items-center px-8'}>
        <p className={'text-xl'}> Kliknutím na tlačítko Start spustíte hru. Odpovědět můžete do dnešní půlnoci. Více o hodnocení se můžete dozvědět v <Link to={'/pravidla'}
          className={'text-orange-500 hover:text-orange-700 transition- duration-100 hover:underline'}>pravidlech</Link>.
        </p>
        <BaseButton color={'orange'} className={'my-4 py-3 px-7 mx-auto hover:scale-105'}
          onClick={() => setGameState('TIMEDOWN')}>
          <span className={'text-4xl'}>START</span>
        </BaseButton>
      </div>
    )
  }

  if (gameState === 'TIMEDOWN') {
    return (
    // <span>3</span>
      <Transition
        show={true}
        appear={true}
        as={Fragment}
        enter="transition ease-out duration-[1000ms] transform-gpu"
        enterFrom="opacity-100 scale-[0.5]"
        enterTo="opacity-0 scale-[3]"
        // leave="transition ease-in duration-150"
        // leaveFrom="opacity-100 translate-y-0"
        // leaveTo="opacity-0 translate-y-1"
      >
        <div className={'text-9xl text-orange-700'}>3</div>
        {/*<div className="h-32 w-32 rounded-md bg-white shadow-lg"/>*/}
      </Transition>
    )
  }

  return <></>

}
