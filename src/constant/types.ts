export interface Requirement {
  type: string;
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  directX?: string;
  network?: string;
  storage?: string;
}

export interface Screenshot {
  image: string;
}

export interface GameData {
  name: string;
  link: string;
  releaseDate: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  gameId: string;
  imageUrl: string;
  genre: string;
  developer: string;
  physical: boolean;
  requirements: Requirement[];
  screenshots: Screenshot[];
}
