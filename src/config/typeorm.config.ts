import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as path from 'path'

const mysqlConfig : TypeOrmModuleOptions  = {
    type: 'mariadb',
    url: process.env.DATABASE_CONNECTION_URL,
    entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: true,
}
export default { mysqlConfig }