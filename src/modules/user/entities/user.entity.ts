import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { TransactionEntity } from "src/modules/transactions/entities/transaction.entity";
import { ReservationEntity } from "src/modules/reservation/entities/reservation.entity";

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

  @OneToMany(() => TransactionEntity, (transaction) => transaction.userId, {
    nullable: true,
  })
  @JoinColumn()
  transactions: TransactionEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.userId, {
    nullable: true,
  })
  @JoinColumn()
  reservations: ReservationEntity[];
}
