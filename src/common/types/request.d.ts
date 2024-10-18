import { ClinicEntity } from "src/modules/clinic/entities/clinic.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
      clinic?: ClinicEntity;
    }
  }
}
