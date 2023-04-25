import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const QuestionPlayPage: NextPage = () => {
  const { query } = useRouter();
  const { questionId } = query;

  return (
    <div>
      <h1>Question {questionId}</h1>
    </div>
  );
};

export default QuestionPlayPage;
