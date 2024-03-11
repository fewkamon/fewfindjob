import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GuestService {
    constructor(private prisma: PrismaService) { }

    async getAllCompany(): Promise<{ id: number; companyname: string; name: string; image: string; }[]> {
        return this.prisma.company.findMany({
            select: {
                id: true,
                companyname: true,
                name: true,
                image: true
            }
        })
    }

    async getOneCompany(id: number): Promise<Company> {
        return this.prisma.company.findUnique({
            where: {
                id: ~~id,
            },
            include: {
                Job: {
                    where: {
                        status: "APPROVE",
                    },
                },
                location: true,
            }
        })
    }
}
