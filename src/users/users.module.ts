import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { EncryptionHelper } from './helpers/encryption.helper';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig.jwtConfig),
    TypeOrmModule.forFeature([
      UserRepository,
    ])
  ],
  controllers: [
    UsersController,
    AuthController
  ],
  providers: [
    EncryptionHelper,
    UsersService,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})
export class UsersModule { }
