import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  id!: number;
  username!: string;
  password!: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
