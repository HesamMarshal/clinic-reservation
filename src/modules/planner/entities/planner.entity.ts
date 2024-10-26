import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityName.Planner)
export class PlannerEntity extends BaseEntity {
  // Fileds
  @Column()
  clinicId: number;

  @Column()
  dayName: string;

  @Column()
  day_number: number;

  @Column()
  start_time: number;

  @Column()
  finish_time: number;

  @Column()
  status: boolean;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.id, { onDelete: "CASCADE" })
  clinic: ClinicEntity;
}
