import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe, Response } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetGoogleUser } from "./decorators/get-google-user.decorator";
import { GetUser } from "./decorators/get-user.decorator";
import { GoogleUser } from "./dto/google-user.dto";
import { LoginDto } from "./dto/login.dto";
import { TokenUser } from "./dto/token-user.dto";
import JwtConfig from './../config/jwt.config';
import { UsersService } from "./users.service";

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UsersService,
    ) { }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() login: LoginDto, @Res() res: any) {
        let user = await this.userService.login(login);
        JwtConfig.cookieSetter(res, user);
        return res.send(user);
    }

    @Get('secured')
    @UseGuards(AuthGuard())
    async secured(@GetUser() user: TokenUser) {
        return { status: 'OK' }
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    @UsePipes(ValidationPipe)
    async googleAuthRedirect(@GetGoogleUser() googleUser: GoogleUser, @Res() res: any) {
        let token = await this.userService.loginWithGoogle(googleUser);
        JwtConfig.cookieSetter(res, token);
        return res.render('post_auth.ejs');
    }

}