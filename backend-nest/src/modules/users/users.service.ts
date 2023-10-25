import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/loginDto';
import { signJwt } from 'src/common/jwt/jwt';

@Injectable()
export class UsersService {


  userData: CreateUserDto[] = [];

  async login(loginDto: loginDto) {
    const { username, password } = loginDto;

    const user = this.userData.find((u) => u.username === username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const access_token = await signJwt(user);
    return { access_token };
  }




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
      throw new NotFoundException("Không tìm thấy user")
    }
    return user;
  }

  update(id: number, updateUserDto: CreateUserDto) {

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
