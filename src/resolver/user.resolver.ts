import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/user';
import { AppDataSource } from '../config/orm-config';


@Resolver()
export class UserResolver {

  userRepository = AppDataSource.getRepository(User);

  @Query((returns) => User)
  async user(@Arg('id') id: number) {
    return this.userRepository.findOneBy({id});
  }

  @Query((returns) => [User])
  async users() {
    return this.userRepository.find();
  }

  @Mutation((returns) => User)
  async createUser(@Arg('name') name: string,
                   @Arg('age') age: number,
                   @Arg('address') address: string,
                   @Arg('phone') phone: string) {


    const user = await this.userRepository.create({
      name,
      age,
      address,
      phone,
    });

    return this.userRepository.save(user);
  }

  @Mutation((returns) => User)
  async updateUser(
    @Arg('id') id: number,
    @Arg('name') name: string,
    @Arg('age') age: number,
    @Arg('address') address: string,
    @Arg('phone') phone: string) {

    const result = await this.userRepository.update(id, {
      name:name,
      age:age,
      address:address,
      phone:phone,
    })

    if(result){
      return this.userRepository.findOneBy({id})
    }else{
      console.log('에러발생')
    }

  }
}
