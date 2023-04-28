import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const TournamentPage: NextPage = () => {
  const { query } = useRouter();
  const { tournamentId } = query;

  return (
    <div>
      <h1>Tournament {tournamentId}</h1>
    </div>
  );
};

export default TournamentPage;