import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async inerstUser(email: string, password: string) {
    const user = new this.userModel({email:email, password:await bcrypt.hash(password, 10)});
    try {
      await user.save();
      return user;      
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    const user = await this.userModel.find().exec();
    return user.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
    }));
  }

  async getUser(email: string): Promise<any> {
    try {
      const user = await this.userModel.find({email:email});
      return user;
    } catch (error) {
      throw new NotFoundException('Cannot find user');
    }
  }

  async deleteUser(id: string): Promise<any> {
    try{
        const user = await this.userModel.findByIdAndRemove(id);
        return "User has been deleted";
    }
    catch(e){
        throw new NotFoundException('Cannot find user');
    }   
  }
}
