import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity {
  // Fileds
  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  clinicId: number;

  @Column()
  code: string;

  @Column()
  expiresIn: Date;

  // Relations
  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
  user: UserEntity;
}
