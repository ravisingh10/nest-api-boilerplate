import { User } from "./user.entity";
import { Role } from './role.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userRoles)
    user: User;

    @ManyToOne(() => Role, user => user.userRoles)
    role: Role;
}