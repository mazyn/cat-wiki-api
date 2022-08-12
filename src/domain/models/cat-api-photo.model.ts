import { CatApiBreedModel } from './cat-api-breed.model';

export type CatApiPhotoModel = {
  breeds: CatApiBreedModel[];
  id: string;
  url: string;
  width: number;
  height: number;
};
