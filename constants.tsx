
import { Reward, Campaign } from './types';

export const MOCK_REWARDS: Reward[] = [
  {
    id: 'r1',
    name: 'LINE POINTS 50點',
    pointsNeeded: 500,
    image: 'https://picsum.photos/seed/linepoints/400/300',
    description: '可於 LINE 購物、貼圖等各項服務折抵。'
  },
  {
    id: 'r2',
    name: '星巴克大杯那堤',
    pointsNeeded: 1200,
    image: 'https://picsum.photos/seed/coffee/400/300',
    description: '經典那堤，美味回甘。'
  },
  {
    id: 'r3',
    name: '全家 100元購物金',
    pointsNeeded: 1000,
    image: 'https://picsum.photos/seed/mart/400/300',
    description: '全台全家便利商店皆可折抵。'
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: '夏季大抽獎',
    description: '每日可免費抽獎一次，最高獎金 8888 點！',
    image: 'https://picsum.photos/seed/summer/600/300',
    type: 'LUCKY_DRAW'
  }
];
