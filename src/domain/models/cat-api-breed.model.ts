export type CatApiBreedModel = {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  cfaUrl: string;
  vetstreetUrl: string;
  vcahospitalsUrl: string;
  temperament: string;
  origin: string;
  countryCodes: string;
  countryCode: string;
  description: string;
  lifeSpan: string;
  indoor: number;
  lap: number;
  altNames: string;
  adaptability: number;
  affectionLevel: number;
  childFriendly: number;
  dogFriendly: number;
  energyLevel: number;
  grooming: number;
  healthIssues: number;
  intelligence: number;
  sheddingLevel: number;
  socialNeeds: number;
  strangerFriendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressedTail: number;
  shortLegs: number;
  wikipediaUrl: string;
  hypoallergenic: number;
  referenceImageId: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
};
