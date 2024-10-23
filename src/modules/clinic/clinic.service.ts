import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UpdateClinicDto } from "./dto/update-clinic.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ClinicEntity } from "./entities/clinic.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import {
  AuthMessage,
  NotFoundMessage,
  PublicMessage,
} from "../auth/enums/message.enum";
import { Request } from "express";
import { CategoryService } from "../category/category.service";

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(ClinicEntity)
    private clinicRepository: Repository<ClinicEntity>,
    private readonly categoryService: CategoryService,

    @Inject(REQUEST) private request: Request
  ) {}

  findAll() {
    const result = this.clinicRepository.find();

    return result;
  }

  async findOne() {
    //  get clinic from token
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = clinic;
    const result = await this.clinicRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return result;
  }

  async update(updateClinicDto: UpdateClinicDto) {
    //  get user from token
    const { first_name, last_name, address, mobile_no, category } =
      updateClinicDto;

    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = clinic;
    const oldClinic = await this.clinicRepository.findOneBy({ id });
    if (!oldClinic) throw new NotFoundException(NotFoundMessage.ClinicNotFount);

    if (first_name) oldClinic.first_name = first_name;
    if (last_name) oldClinic.last_name = last_name;
    if (address) oldClinic.address = address;
    if (mobile_no) oldClinic.mobile_no = mobile_no;

    if (category) {
      const existCategory =
        await this.categoryService.checkCategoryBySlug(category);
      if (existCategory) {
        oldClinic.categoryId = existCategory.id;
      } else {
        // create new category and add to oldClinic
        const newCategory =
          await this.categoryService.createWithTitle(category);
        oldClinic.categoryId = newCategory.id;
      }
    }

    //  edit
    await this.clinicRepository.update(
      { id },
      {
        first_name: oldClinic.first_name,
        last_name: oldClinic.last_name,
        address: oldClinic.address,
        mobile_no: oldClinic.mobile_no,
        categoryId: oldClinic.categoryId,
      }
    );
    return { message: PublicMessage.Updated };
  }

  async remove() {
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = clinic;
    const result = await this.clinicRepository.findOneBy({ id });
    this.clinicRepository.remove(result);
    return { message: PublicMessage.Deleted };
  }
}
