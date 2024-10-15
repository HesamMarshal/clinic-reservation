import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { randomInt } from "crypto";
import { OtpEntity } from "../user/entities/otp.entity";
import { Request, Response } from "express";
import { AuthResponse } from "./types/response";
import { TokenService } from "./tokens.service";
import { PublicMessage } from "./enums/message.enum";
import { CookieKeys } from "src/common/enums/cookie.enum";
import { CookieOptions } from "src/common/utils/cookie.util";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,

    private tokenService: TokenService
  ) {}

  async userExistence(authDto: AuthDto, res: Response) {
    const clinicId = null;
    const { mobile } = authDto;
    let result = null;
    // let result: AuthResponse;

    let user = await this.userRepository.findOneBy({ mobile });
    if (!user) {
      result = await this.userRegister(mobile);
    } else {
      result = await this.login(user.id, clinicId);
    }

    // Send Otp Code By SMS
    this.sendOTP();
    console.log(result);

    return this.sendResponse(res, result);
  }
  async userRegister(mobile: string) {
    // add user to user table
    let user = await this.userRepository.create({
      mobile,
    });
    // Save the new user
    user = await this.userRepository.save(user);

    const otp = await this.saveOTP(user.id, null);
    // console.log(otp);

    const token = this.tokenService.createOtpToken({ userId: user.id });
    // return user;
    return {
      token,
      code: otp.code,
      message: "test",
    };
  }

  async login(userId: number, clinicId: number) {
    // Create and Save OTP in DB
    const otp = await this.saveOTP(userId, clinicId);

    // Create token that contains UserId, we use it identify the user
    const token = this.tokenService.createOtpToken({ userId });

    // console.log(otp);
    return {
      token,
      code: otp.code,
    };
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

    // TODO: in production we dont need code and token to be sent
    const { token, code } = result;
    res.cookie(CookieKeys.OTP, token, CookieOptions());
    res.json({
      message: PublicMessage.SendOtp,
      token,
      code,
    });
  }

  async sendOTP() {
    console.log("Send OTP via SMS/Email not Implemented yet");
  }
}
