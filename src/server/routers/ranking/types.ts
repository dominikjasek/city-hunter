type Medal = 'GOLD' | 'SILVER' | 'BRONZE';

export interface TournamentUserScore {
  userId: string;
  nickName: string;
  score: number;
  medals: Record<Medal, number>;
  medalsScore: number;
}
