import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  // Fileds

  @Column({})
  first_name: string;

  @Column({})
  last_name: string;

  @Column({ unique: true })
  mobile: string;
}
