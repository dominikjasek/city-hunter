import { Transition } from '@headlessui/react'

import { FC, Fragment, useEffect, useState } from 'react'

interface IProps {
    onTimeElapsed: () => void
}

const TIMEDOWN_DURATION = 3 // seconds

export const Timedown: FC<IProps> = (props) => {
  const transitionArray = [ ...Array(TIMEDOWN_DURATION).keys() ].map(i => i + 1)
  const [ time, setTime ] = useState<number>(TIMEDOWN_DURATION)

  const timeInterval = setInterval(() => {
    setTime(time - 1)
    return clearInterval(timeInterval)
  }, 1000)

  useEffect(() => {
    if (time === 0) {
      props.onTimeElapsed()
    }
  }, [ time ])

  return (
    <div className={'flex-grow flex flex-col justify-center items-center'}>
      {
        transitionArray.map((secondsRemaining) => (
          secondsRemaining === time && time > 0 && <Transition
            key={secondsRemaining}
            show={secondsRemaining === time}
            appear={true}
            as={Fragment}
            enter="transition ease-out duration-[1000ms] transform-gpu"
            enterFrom="opacity-100 scale-[0.5]"
            enterTo="opacity-0 scale-[3]"
          >
            <div className={'text-9xl text-orange-700'}>{time}</div>
          </Transition>))
      }
    </div>
  )
}