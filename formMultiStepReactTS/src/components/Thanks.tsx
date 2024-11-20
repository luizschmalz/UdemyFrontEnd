import { ReactElement } from 'react'
import './Thanks.css'
import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiSmileFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiFrownFill,
} from 'react-icons/bs'

type ThanksProps = {
  data: {
    name: string,
    review: string,
    comment: string
  }
}

type emojiObject = {
  unsatisfied: ReactElement,
  neutral: ReactElement,
  satisfied: ReactElement,
  very_satisfied: ReactElement
}

const emojiData: emojiObject ={
  unsatisfied: <BsFillEmojiFrownFill />,
  neutral: <BsFillEmojiNeutralFill />,
  satisfied: <BsFillEmojiSmileFill />,
  very_satisfied: <BsFillEmojiHeartEyesFill />
}

const Thanks = ({data}: ThanksProps) => {
  return (
    <div className='thanks-container'>
      <h2>Falta pouco...</h2>
      <p>
        Obrigado por comprar conosco, seu feedback é de extrema importância para o desenvolvimento da nossa loja!
      </p>
      <p>Para concluir sua avaliação clique no botão de enviar abaixo</p>
      <h3>Resumo da avaliação: {data.name}</h3> 
      <p className='review-data'>
        <span>Satisfação com o produto:{emojiData[data.review as keyof typeof emojiData]}</span>
      </p>
      <p className='review-data'>
        <span>Seu comentário: {data.comment}</span>
      </p>
    </div>
  )
}

export default Thanks