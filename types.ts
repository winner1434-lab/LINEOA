
export enum AppView {
  LINE_OA = 'LINE_OA',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  HOME = 'HOME',
  EARN = 'EARN',
  REDEEM = 'REDEEM',
  CAMPAIGN = 'CAMPAIGN',
  HISTORY = 'HISTORY'
}

export interface User {
  name: string;
  phone: string;
  lineUid: string;
  points: number;
  level: string;
  isRegistered: boolean;
}

export interface Reward {
  id: string;
  name: string;
  pointsNeeded: number;
  image: string;
  description: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'LUCKY_DRAW' | 'MISSION';
}

export interface WinningRecord {
  id: string;
  prize: string;
  date: string;
}
