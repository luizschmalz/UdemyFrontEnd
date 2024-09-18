import './Thanks.css';

import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiSmileFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiFrownFill,
} from 'react-icons/bs';

const emojiData = {
  unsatisfied: <BsFillEmojiFrownFill/>,
  neutral: <BsFillEmojiNeutralFill/>,
  good: <BsFillEmojiSmileFill/>,
  excellent: <BsFillEmojiHeartEyesFill/>,
};

export const Thanks = ({data} ) => {
  return (
    <div className='thanks-container'>
      <h2>Falta pouco...</h2>
      <p>
        Obrigado por comprar conosco, seu feedback é de extrema importância para o desenvolvimento da nossa loja!
      </p>
      <p>Para concluir sua avaliação clique no botão de enviar abaixo</p>
      <h3>Resumo da avaliação: {data.name}</h3> 
      <p className='review-data'>
        <span>Satisfação com o produto:{emojiData[data.review]}</span>
      </p>
      <p className='review-data'>
        <span>Seu comentário: {data.comment}</span>
      </p>

    </div>
  )
}
