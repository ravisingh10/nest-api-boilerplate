import { JwtModuleOptions } from "@nestjs/jwt";

const COOKIE_EXPIRATION = (process.env.APP_ENV === 'DEV' ? 1 : 30) * 86400;

const jwtConfig: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRE_SECONDS,
    }
}

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req?.cookies?.session?.token;
    }
    return token;
};

var cookieSetter = function (res, cookieData) {
    res.cookie('session', cookieData, {
        expiresIn: COOKIE_EXPIRATION,
        httpOnly: true,
    });
}

export default { jwtConfig, cookieExtractor, cookieSetter }