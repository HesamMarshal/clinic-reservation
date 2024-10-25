import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { PaymentStatus } from "../types/status.enum";

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
  @Column()
  status: boolean;
  @Column()
  date: Date;
  @Column({ default: PaymentStatus.Pending })
  payment_status: string;

  // Relations
  @ManyToOne(() => ClinicEntity, (clinic) => clinic.id)
  clinic: ClinicEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
