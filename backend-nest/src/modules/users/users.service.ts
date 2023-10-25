import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private userData: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const user = {
      id: this.userData.length + 1,
      ...createUserDto,
    };
    this.userData.push(user);

    return user;
  }

  findAll({ page, limit, keyword }) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = this.userData.slice(startIndex, endIndex);

    const filteredUsers = keyword
      ? paginatedUsers.filter(user => user.fullName.includes(keyword))
      : paginatedUsers;

    return {
      page,
      limit,
      total: this.userData.length,
      users: filteredUsers,
    };
  }

  findOne(id: number) {
    const user = this.userData.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: CreateUserDto) {
    console.log(`Updating user with ID #${id}:`, updateUserDto);



    this.userData = this.userData.map((u) => {
      if (u.id === id) {
        return { ...u, ...updateUserDto };
      }
      return u;
    });


    return this.findOne(id);
  }

  remove(id: number) {
    this.userData = this.userData.filter((u) => u.id !== id);
    return { message: "Removed" };
  }
}
