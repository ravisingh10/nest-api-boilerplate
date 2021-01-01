import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('art')
@UseGuards(AuthGuard())
export class ArtController {

    @Get()
    get() {
        return {status: 'OK'}
    }
}
