import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { PaymentStatus, ReservationStatus } from "../types/status.enum";
import { TransactionEntity } from "src/modules/transactions/entities/transaction.entity";

@Entity(EntityName.Reservaion)
export class ReservationEntity extends BaseEntity {
  // Fields
  @Column()
  clinicId: number;
  @Column()
  userId: number;
  @Column()
  start_visit_time: number;
  @Column()
  finish_visit_time: number;
  @Column({ default: ReservationStatus.Pending })
  status: string;
  @Column()
  date: Date;
  @Column({ default: PaymentStatus.Pending })
  payment_status: string;

  // Relations
  @ManyToOne(() => ClinicEntity, (clinic) => clinic.id)
  clinic: ClinicEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @OneToOne(() => TransactionEntity, (transaction) => transaction.id, {
    nullable: true,
  })
  @JoinColumn()
  paymentId: TransactionEntity;
}
