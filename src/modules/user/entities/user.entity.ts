import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  // Fileds
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
