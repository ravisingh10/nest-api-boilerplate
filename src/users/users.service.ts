import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUser } from './dto/google-user.dto';
import { JwtPayload } from './dto/jwt-payload';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { EncryptionHelper } from './helpers/encryption.helper';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private encHelper: EncryptionHelper
    ) { }

    async create(user: CreateUserDto) {
        try {
            if (user.password !== user.confirmPassword)
                throw new BadRequestException(`Password should match confirm password`);
            user.password = await this.hashPassword(user.password);
            let newUser = this.sanitizeUser(await this.userRepository.save(user));
            return newUser;
        } catch (error) {
            if (error.errno == 1062)
                throw new ConflictException(`User already registered`);
            throw error;
        }
    }

    async login(loginRequest: LoginDto): Promise<JwtPayload> {
        let user = await this.userRepository.findOne({ email: loginRequest.username });
        if (!user)
            throw new BadRequestException();
        if (!await this.compare(loginRequest.password, user.password))
            throw new BadRequestException();
        const token = await this.getUserToken(user);
        return { token };
    }

    private async getUserToken(user) {
        const sanitizedUser = this.sanitizeUser({ ...user });
        const token = await this.jwtService.sign(this.encHelper.encrypt(sanitizedUser));
        return token;
    }

    async loginWithGoogle(googleUser: GoogleUser) {
        let { firstName, lastName, email, picture } = googleUser;
        let user = new User();
        user.firstname = firstName;
        user.lastname = lastName;
        user.email = email;
        user.pic = picture;
        user.password = this.encHelper.getRandomString();

        let existingUser = await this.userRepository.findOne({ email: email });
        if (!existingUser)
            existingUser = await this.userRepository.save(user);

        let token = await this.getUserToken(existingUser);
        return { token }

    }

    private async hashPassword(password: string) {
        let salt = await bcrypt.genSalt();
        let hashed = await bcrypt.hash(password, salt);
        return hashed;
    }

    private async compare(text, hashed) {
        return bcrypt.compare(text, hashed);
    }

    async get() {
        let users = await this.userRepository.find();
        return users.map(this.sanitizeUser)
    }

    sanitizeUser(user: User) {
        delete user.password;
        delete user.email;
        return user;
    }

}
