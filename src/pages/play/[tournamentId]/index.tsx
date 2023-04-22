import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const TournamentPage: NextPage = () => {
  const { query } = useRouter();
  const { tournamentId } = query;
  console.log('tournamentId', tournamentId);

  return (
    <div>
      <h1>Tournament {tournamentId}</h1>
    </div>
  );
};

export default TournamentPage;
