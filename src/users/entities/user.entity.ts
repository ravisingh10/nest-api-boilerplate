import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstname: string;

    @Column({ nullable: true })
    lastname?: string;

    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text', nullable: true })
    pic: string;

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRoles?: UserRole[];


}