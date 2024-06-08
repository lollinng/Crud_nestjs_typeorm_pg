import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id :string

    @Column({type:'varchar',length:200})
    name: string;
  
    @Column({type:'varchar',length:100, unique: true })
    email: string;
    
    @Column({type:'varchar',length:10})
    mobile: string;
  
    @Column({type:'varchar',length:10})
    gender: string;

    @Column({type:'timestamptz'})
    data_of_birth: Date;
}