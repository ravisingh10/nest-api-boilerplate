import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ArtController } from './art.controller';
import { ArtService } from './art.service';

@Module({
  imports: [UsersModule],
  controllers: [ArtController],
  providers: [ArtService]
})
export class ArtModule {}
