import { Deserializable } from './deserializable.model';

export class Photo implements Deserializable {
  albumId!: number;
  id!: number;
  title!: string;
  url!: string;
  thumbnailUrl!: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
