import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Post('createUser')
    async createUser(@Body() data:CreateUserDto){
        console.log('api hit')
        return await this.userService.createUser(data)
    }

    @Put('updateUser/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        console.log('Update user API hit');
        return await this.userService.updateUser(id, data);
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id: string) {
        console.log('Delete user API hit');
        return await this.userService.deleteUser(id);
    }

    @Get('')
    async getAllUsers() {
        console.log('Get all users API hit');
        return await this.userService.getAllUsers();
    }

    @Get('getUserById/:id')
    async getUserById(@Param('id') id: string) {
        console.log('Get user by ID API hit');
        return await this.userService.getUserById(id);
    }
}