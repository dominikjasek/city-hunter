import { IRiddleWithAvailability } from '@api/riddle/riddle.interface'
import React, { FC, useState } from 'react'
import { Riddle } from '~/components/Game/GameScreen/Riddle'
import { PressToPlay } from '~/components/Game/StartingScreen/PressToPlay'
import { Timedown } from '~/components/Game/StartingScreen/Timedown'
import { useRiddleRepository } from '~/infrastructure/riddle/RiddleRepository'

enum GameState {
    START_SCREEN = 'START_SCREEN',
    TIMEDOWN = 'TIMEDOWN',
    PLAYING = 'PLAYING',
}

export const GameStateController: FC = () => {
  const [ gameState, setGameState ] = useState<GameState>(GameState.START_SCREEN)
  const riddleRepository = useRiddleRepository()

  const [ riddle, setRiddle ] = useState<IRiddleWithAvailability | null>(null)

  const getRiddle = async () => {
    const riddle = await riddleRepository.getRiddle()
    setRiddle(riddle)
  }

  if (gameState === GameState.START_SCREEN) {
    return <PressToPlay onClick={() => setGameState(GameState.TIMEDOWN)}/>
  }

  if (gameState === GameState.TIMEDOWN) {
    return <Timedown
      onOneSecondRemaining={getRiddle}
      onTimeElapsed={() => setGameState(GameState.PLAYING)}
    />
  }

  if (gameState === GameState.PLAYING) {
    if (riddle === null) {
      return <span>Úloha se načítá...</span>
    }

    if (!riddle.availability.isAvailable) {
      return <span>{riddle.availability.message}</span>
    }

    if (riddle.riddle === undefined) {
      return <span>dafuq, kontaktujte administrátora</span>
    }

    return <Riddle riddle={riddle.riddle}/>
  }

  return <div>fucking shit</div>

}