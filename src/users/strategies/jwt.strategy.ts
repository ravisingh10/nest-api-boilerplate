import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';

import { TokenUser } from '../dto/token-user.dto';
import { EncryptionHelper } from '../helpers/encryption.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private encHelper: EncryptionHelper) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                jwtConfig.cookieExtractor
            ]),
            secretOrKey: jwtConfig.jwtConfig.secret
        })
    }

    async validate(payload: any): Promise<TokenUser> {
        let { data } = payload;

        let load = this.encHelper.decrypt({ data })

        if (!load.id) {
            throw new UnauthorizedException();
        }

        let tokenUser = (<TokenUser>load)
        return tokenUser;
    }
}


