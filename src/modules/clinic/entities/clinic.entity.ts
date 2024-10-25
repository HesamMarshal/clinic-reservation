import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { PlannerEntity } from "src/modules/planner/entities/planner.entity";
import { TransactionEntity } from "src/modules/transactions/entities/transaction.entity";
import { OtpEntity } from "src/modules/user/entities/otp.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity(EntityName.Clinic)
export class ClinicEntity extends BaseEntity {
  // Fileds
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  mobile_no: string;

  @Column({ nullable: true })
  otpId: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  confirmed_at: Date;

  //  Date & time
  @CreateDateColumn()
  created_at: Date;

  // Relations
  @OneToOne(() => OtpEntity, (otp) => otp.clinic, { nullable: true })
  @JoinColumn()
  otp: OtpEntity;

  // Relations
  @OneToOne(() => CategoryEntity, (category) => category.id, { nullable: true })
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(() => PlannerEntity, (planner) => planner.clinicId, {
    nullable: true,
  })
  @JoinColumn()
  palns: PlannerEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.clinicId, {
    nullable: true,
  })
  @JoinColumn()
  transactions: TransactionEntity[];
}
