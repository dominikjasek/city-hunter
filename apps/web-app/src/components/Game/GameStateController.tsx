import React, { FC, useState } from 'react'
import { PressToPlay } from '~/components/Game/StartingScreen/PressToPlay'
import { Timedown } from '~/components/Game/StartingScreen/Timedown'

type GameState = 'START_SCREEN' | 'TIMEDOWN' | 'PLAYING'

export const GameStateController: FC = () => {
  const [ gameState, setGameState ] = useState<GameState>('START_SCREEN')

  if (gameState === 'START_SCREEN') {
    return <PressToPlay onClick={() => setGameState('TIMEDOWN')}/>
  }

  if (gameState === 'TIMEDOWN') {
    return <Timedown onTimeElapsed={() => setGameState('PLAYING')}/>
  }

  return <div>Playing</div>

  return <></>

}