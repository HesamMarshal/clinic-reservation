import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { TransacionStatus } from "../types/status.enum";
import { ReservationEntity } from "src/modules/reservation/entities/reservation.entity";

@Entity(EntityName.Transacion)
export class TransactionEntity extends BaseEntity {
  // Fields
  @Column()
  clinicId: number;
  @Column()
  userId: number;
  @Column()
  amount: number;
  @Column({ default: TransacionStatus.Pending })
  status: string;
  @Column()
  date: Date;

  @Column([])
  reservationId: number;

  // Relations
  @ManyToOne(() => ClinicEntity, (clinic) => clinic.id)
  clinic: ClinicEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
  // @OneToOne(() => ReservationEntity, (reservation) => reservation.id)
  // reservationId: ReservationEntity;
}
