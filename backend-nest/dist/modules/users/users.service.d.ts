import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userData;
    create(createUserDto: CreateUserDto): {
        id: number;
        fullName: string;
        username: string;
        password: string;
        role: string;
    };
    findAll({ page, limit, keyword }: {
        page: any;
        limit: any;
        keyword: any;
    }): {
        page: any;
        limit: any;
        total: number;
        users: CreateUserDto[];
    };
    findOne(id: number): CreateUserDto;
    update(id: number, updateUserDto: CreateUserDto): CreateUserDto;
    remove(id: number): {
        message: string;
    };
}
