import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/db/entitites/user-entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private manager:EntityManager
    
    constructor(
        @Inject('DataSource')
        private dataSource:DataSource
    ){
        this.manager = this.dataSource.manager
    }   

    //create user
    async createUser(data:CreateUserDto){
        try{
            const user = await this.manager.findOneBy(UserEntity,{email:data.email})
            
            if(user){
                throw new Error('User is already exists,go to login')
            }

            const newUser = await this.manager.create(UserEntity,{
                email:data.email,
                name:data.name,
                mobile:data.mobile,
                gender:data.gender,
                data_of_birth:data.date_of_birth
            })
            const createUser = await this.manager.save(newUser)
            return {message:'user created successfully ',createUser}
        }catch(error){
            throw new NotFoundException(`${error.message}`)
        }
    }

    async updateUser(id: string, data: UpdateUserDto) {
        try {
            const user = await this.manager.findOneBy(UserEntity, { id });

            if (!user) {
                throw new Error('User not found');
            }

            this.manager.merge(UserEntity, user, data);
            const updatedUser = await this.manager.save(user);

            return { message: 'User updated successfully', updatedUser };
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }

    // delete user
    async deleteUser(id: string) {
        try {
            const user = await this.manager.findOneBy(UserEntity, { id });

            if (!user) {
                throw new Error('User not found');
            }

            await this.manager.delete(UserEntity, user);

            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }

    // get all users
    async getAllUsers() {
        try {
            const users = await this.manager.find(UserEntity);
            return { message: 'Users retrieved successfully', data: users };
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }

    // get user by id
    async getUserById(id: string) {
        try {
            const user = await this.manager.findOneBy(UserEntity, { id });

            if (!user) {
                throw new Error('User not found');
            }

            return { message: 'User retrieved successfully',data: user };
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }
}




