"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.userData = [];
    }
    create(createUserDto) {
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
    findOne(id) {
        const user = this.userData.find((u) => u.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID #${id} not found`);
        }
        return user;
    }
    update(id, updateUserDto) {
        console.log(`Updating user with ID #${id}:`, updateUserDto);
        this.userData = this.userData.map((u) => {
            if (u.id === id) {
                return { ...u, ...updateUserDto };
            }
            return u;
        });
        return this.findOne(id);
    }
    remove(id) {
        this.userData = this.userData.filter((u) => u.id !== id);
        return { message: "Removed" };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map