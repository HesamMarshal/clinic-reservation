import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { randomInt } from "crypto";
import { OtpEntity } from "../user/entities/otp.entity";
import { Request, Response } from "express";
import { AuthResponse } from "./types/response";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>
  ) {}

  async userExistence(authDto: AuthDto, res: Response) {
    const clinicId = null;
    const { mobile } = authDto;
    let user = await this.userRepository.findOneBy({ mobile });

    if (!user) {
      // add user to user table
      user = await this.userRepository.create({
        mobile,
      });
      user = await this.userRepository.save(user);
    }

    //  send otp
    const otp = await this.saveOTP(user.id, clinicId);

    // Create and Save OTP in DB
    // Create token that contains UserId, we use it identify the user
    // Send Otp Code : SMS or Email
    const result = otp;
    return this.sendResponse(res, result);
    return otp;
  }

  async clinicExistence(authDto: AuthDto, res: Response) {}

  checkOTP(code: string) {
    throw new Error("Method not implemented.");
  }

  // Helper methods

  async saveOTP(userId: number, clinicId: number) {
    // Create OTP code and save in DB
    const code = randomInt(10000, 99999).toString();
    const expiresIn = new Date(Date.now() + 120000);

    // Check if userId is available in DB
    let otp = null;
    let existOtp = false;
    if (userId) {
      otp = await this.otpRepository.findOneBy({ userId });
    }
    if (clinicId) {
      otp = await this.otpRepository.findOneBy({ userId });
    }

    if (otp) {
      existOtp = true;
      otp.code = code;
      otp.expiresIn = expiresIn;
    } else {
      otp = this.otpRepository.create({
        userId,
        clinicId,
        code,
        expiresIn,
      });
    }

    otp = await this.otpRepository.save(otp);
    if (!existOtp)
      await this.userRepository.update({ id: userId }, { otpId: otp.id });

    return otp;
  }

  async sendResponse(res: Response, result: AuthResponse) {
    // Send token and code??? to the client

    // TODO: in production we dont need code to be sent
    const { token, code } = result;
    // res.cookie(CookieKeys.OTP, token, CookieOptions());
    res.json({
      // message: PublicMessage.SendOtp,
      code,
    });
  }
}
