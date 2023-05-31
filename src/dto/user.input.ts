import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput{
  @Field()
  name:string;

  @Field()
  age:number;

  @Field()
  address:string;

  @Field()
  phone:string;
}
