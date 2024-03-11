import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel, Role } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { AuthChangepasswordDto } from './dto/patch-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService
    ) { }

    async me(sub: number): Promise<UserModel> {
        const user = await this.prisma.user.findUnique({
            where: { id: sub },
            include: {
                jobseeker: {
                    include: {
                        skill: true,
                        location: true
                    }
                },
                company: {
                    include: {
                        location: true
                    }
                },
            },
        });
        delete user["password"]
        return user
    }

    async signIn(data: { email: string, password: string }): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
            throw new NotFoundException(`ไม่พบผู้ใช้อีเมล: ${data.email}`);
        }

        const passwordValid = await this.passwordService.validatePassword(
            data.password,
            user.password,
        );

        if (!passwordValid) {
            throw new BadRequestException('รหัสผ่านไม่ถูกต้อง');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async changePassword(sub: number, data: AuthChangepasswordDto): Promise<UserModel> {
        const user = await this.prisma.user.findUnique({ where: { id: sub } });

        const passwordValid = await this.passwordService.validatePassword(
            data.passwordold,
            user.password,
        );

        if (!passwordValid) {
            throw new BadRequestException('รหัสผ่านเก่าไม่ถูกต้อง');
        } else if (data.passwordnew !== data.passwordnewconfirm) {
            throw new BadRequestException('รหัสผ่านใหม่ไม่ตรงกัน');
        } else if (data.passwordold === data.passwordnewconfirm) {
            throw new BadRequestException('รหัสผ่านเก่ากับรหัสผ่านใหม่ต้องไม่เหมือนกัน');
        }

        const hashedPassword = await this.passwordService.hashPassword(
            data.passwordnew,
        );

        return this.prisma.user.update({
            where: {
                id: sub
            },
            data: {
                password: hashedPassword
            }
        })

    }

    async createJobseeker(data: { email: string, role: Role, password: string, confirm: string }): Promise<UserModel> {

        const hashedPassword = await this.passwordService.hashPassword(
            data.password,
        );

        const IsEmail = await this.prisma.user.findUnique({ where: { email: data.email } })

        if (data.password !== data.confirm) {
            throw new BadRequestException('รหัสผ่านไม่ตรงกัน');
        } else if (IsEmail) {
            throw new BadRequestException('อีเมลล์ผู้ใช้ซ้ำกับในระบบ');
        }

        return this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role,
                jobseeker: {
                    create: {
                        location: {
                            create: {
                            }
                        },
                        skill: {
                            create: {
                            }
                        }
                    }
                }
            }
        });
    }

    async createCompany(data: { email: string, role: Role, password: string, confirm: string, phonenumber: string, companyname: string, description: string, name: string }): Promise<UserModel> {

        const hashedPassword = await this.passwordService.hashPassword(
            data.password,
        );

        const IsEmail = await this.prisma.user.findUnique({ where: { email: data.email } })

        if (data.password !== data.confirm) {
            throw new BadRequestException('รหัสผ่านไม่ตรงกัน');
        } else if (IsEmail) {
            throw new BadRequestException('อีเมลล์ผู้ใช้ซ้ำกับในระบบ');
        }

        return this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role,
                company: {
                    create: {
                        phonenumber: data.phonenumber,
                        companyname: data.companyname,
                        description: data.description,
                        name: data.name,
                        location: {
                            create: {
                            }
                        }
                    }
                }
            }
        });

    }
}
