import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel, Status } from '@prisma/client';

@Injectable()
export class AdminCompanyService {
    constructor(private prisma: PrismaService) { }

    async getPendingCompany(): Promise<UserModel[]> {
        const user = await this.prisma.user.findMany({
            where: { role: "COMPANY", company: { status: "PENDING" } },
            include: {
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

    async getAllCompany(): Promise<UserModel[]> {
        const user = await this.prisma.user.findMany({
            where: { role: "COMPANY" },
            include: {
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

    async patchStatusCompany(id: number, status: Status): Promise<UserModel> {
        try {
            if (status === "DISAPPROVAL" || status === "APPROVE") {
                const user = await this.prisma.user.update({
                    where: { id },
                    data: {
                        company: {
                            update: {
                                status: status
                            }
                        }
                    }
                });
                return user
            } else {
                throw new NotFoundException(`Expected status APPROVE or DISAPPROVAL`);
            }
        } catch (err) {
            if (err.response) {
                throw new NotFoundException(err.response.message);
            } else {
                throw new NotFoundException(`ไม่พบผู้ใช้ไอดีนี้ในระบบ`);
            }
        }
    }
}
