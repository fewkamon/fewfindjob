import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class AdminService {
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
}
