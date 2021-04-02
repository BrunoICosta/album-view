import { Deserializable } from './deserializable.model';

export class Album implements Deserializable {
  userId!: number;
  id!: number;
  title!: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
