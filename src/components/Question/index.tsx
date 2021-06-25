import React, {ReactNode} from 'react';

import './styles.scss';

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered: boolean;
  isHighlighted: boolean;
}

const Question: React.FC<QuestionProps> = ({content, author, children, isAnswered=false, isHighlighted=false}:QuestionProps) => {
  return (
    <div
      className={`question
      ${isAnswered && 'answered'}
      ${(isHighlighted && !isAnswered) && 'highlighted'}
      `}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="react-buttons">
          {children}
        </div>
      </footer>
    </div>
  )
}

export default Question;
