import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput{
  @Field()
  id: number;

  @Field()
  name:string;

  @Field()
  age:number;

  @Field()
  address:string;

  @Field()
  phone:string;
}
