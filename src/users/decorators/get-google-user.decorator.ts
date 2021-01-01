import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GoogleUser } from "../dto/google-user.dto";

export const GetGoogleUser = createParamDecorator((data, ctx: ExecutionContext): GoogleUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});