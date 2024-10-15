import { EntityName } from "src/common/enums/entity.enum";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity(EntityName.User)
export class UserEntity {
  // Fileds
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: true })
  otpId: number;

  // Relations
  @OneToOne(() => OtpEntity, (otp) => otp.user, { nullable: true })
  @JoinColumn()
  otp: OtpEntity;
}
