import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  // Relations
  @ManyToOne(() => ClinicEntity, (clinic) => clinic.id, { onDelete: "CASCADE" })
  clinic: ClinicEntity;
}
