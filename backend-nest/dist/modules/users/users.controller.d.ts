import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): {
        id: number;
        fullName: string;
        username: string;
        password: string;
        role: string;
    } | {
        error: any;
    };
    findAll(page: number, limit: number, keyword: string): {
        page: any;
        limit: any;
        total: number;
        users: CreateUserDto[];
    } | {
        error: any;
    };
    findOne(id: string): CreateUserDto | {
        error: any;
    };
    update(id: string, updateUserDto: CreateUserDto): CreateUserDto | {
        error: any;
    };
    remove(id: string): {
        message: string;
    } | {
        error: any;
    };
}
