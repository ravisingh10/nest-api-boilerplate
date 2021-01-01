import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenUser } from "../dto/token-user.dto";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): TokenUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});