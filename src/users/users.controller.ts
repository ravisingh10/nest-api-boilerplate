import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user)
    }

}
