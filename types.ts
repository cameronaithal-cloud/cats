
export interface Cat {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  price: number;
  description: string;
  image: string;
  personality: string[];
  energyLevel: 1 | 2 | 3 | 4 | 5;
  shedding: 1 | 2 | 3 | 4 | 5;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface MatchResult {
  catId: string;
  reasoning: string;
  matchPercentage: number;
}
