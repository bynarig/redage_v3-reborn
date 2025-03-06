import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface Comment {
  officerName: string;
  officerRank: string;
  timestamp: string;
  content: string;
}

// Mock data for development
const mockComments: Comment[] = Array(20).fill(null).map(() => ({
  officerName: "Arlando Pattinson",
  officerRank: "(2) Младший офицер",
  timestamp: "12.09.2021 15:56",
  content: "Грубое общение с сотрудниками силовых структур, часто был замечен в компании людей в красной одежде. Множество раз был задержан и осужден за оружейные нападения и предумышленные убийства второй и третьей степени."
}));

interface CommentsProps {
  comments?: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments = [] }) => {
  // Use mock data in development mode
  const commentsToShow = ENVIRONMENT === 'development' ? mockComments : comments;
  
  return (
    <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
      {commentsToShow.map((comment, index) => (
        <div key={index} className="bg-base-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="bortovoiicon-police"></span>
              </div>
              <div className="font-medium mr-3">{comment.officerName}</div>
              <div className="text-base-content/60 text-sm">{comment.officerRank}</div>
            </div>
            <div className="text-base-content/60 text-sm">
              {comment.timestamp}
            </div>
          </div>
          <div className="text-sm">
            {comment.content}
          </div>
        </div>
      ))}
      {commentsToShow.length === 0 && (
        <div className="text-center py-8 text-base-content/60">
          {translateText('fractions', 'Нет комментариев')}
        </div>
      )}
    </div>
  );
};

export default Comments;