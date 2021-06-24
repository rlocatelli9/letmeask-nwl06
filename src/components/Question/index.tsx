import React, {ReactNode} from 'react';

import './styles.scss';

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode
}

const Question: React.FC<QuestionProps> = ({content, author, children}:QuestionProps) => {
  return (
    <div className="question">
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
