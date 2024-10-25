import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

@Entity(EntityName.Transacion)
export class TransactionEntity extends BaseEntity {
  // Fields
  @Column()
  clinicId: number;
  @Column()
  userId: number;
  @Column()
  amount: number;
  @Column()
  status: boolean;
  @Column()
  date: number;

  // Relations
  @ManyToOne(() => ClinicEntity, (clinic) => clinic.id)
  clinic: ClinicEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
