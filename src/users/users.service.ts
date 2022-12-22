import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({ ...createUserDto });

    return this.userRepository.save(newUser);
  }

  findAll(name: string) {
    if (name) {
      return this.userRepository
        .createQueryBuilder()
        .where('user.name= :name', { name })
        .getMany();
    }
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository
      .createQueryBuilder()
      .where('user.id=:id', { id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
