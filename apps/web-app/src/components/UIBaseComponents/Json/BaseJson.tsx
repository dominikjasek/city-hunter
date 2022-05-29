import { FC } from 'react'

interface IProps {
    data: object
}

export const BaseJson: FC<IProps> = ({ data }) => {
  // (destructured) data could be a prop for example
  return (<div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>)
}