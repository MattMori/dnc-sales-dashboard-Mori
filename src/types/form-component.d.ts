export type inputProps = React.InputHTMLAttributes<HTMLInputElement>
export type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type MessageProps = {
  msg: string
  type: 'success' | 'error'
}

export interface formComponentProps {
  inputs: inputProps[]
  buttons: buttonProps[]
  message?: MessageProps
}
