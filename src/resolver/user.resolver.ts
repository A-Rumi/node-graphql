import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/user';
import { AppDataSource } from '../config/orm-config';
import { UserInput } from '../dto/user.input';


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
  async createUser(@Arg('data') userData: UserInput) {

    console.log('유저생성 인풋 데이터', userData);
    const user = await this.userRepository.create(userData);

    return this.userRepository.save(user);
  }

  @Mutation((returns) => User)
  async updateUser(
    @Arg('id') id: number,
    @Arg('data') userData: UserInput) {
    console.log('유저수정 인풋 데이터', id, userData);
    const result = await this.userRepository.update(id, userData);

    if (result) {
      return this.userRepository.findOneBy({id});
    } else {
      console.log('에러발생');
    }

  }
}
