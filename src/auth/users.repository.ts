import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredetinalsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredetinalsDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
