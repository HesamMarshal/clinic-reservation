import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity } from "typeorm";

export class Planner {}

@Entity(EntityName.Planner)
export class ClinicEntity extends BaseEntity {
  // Fileds
  @Column()
  clinicId: string;

  @Column()
  dayName: string;

  @Column()
  day_number: string;

  @Column()
  start_time: string;

  @Column()
  finish_time: string;

  @Column()
  status: boolean;
}
