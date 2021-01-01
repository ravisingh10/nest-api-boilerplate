import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TreeRepository } from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;


    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles?: UserRole[];

}