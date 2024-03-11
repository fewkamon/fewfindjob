import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) { }

    async getPendingJobCompany(): Promise<Job[]> {
        const user = await this.prisma.job.findMany({
            where: { status: "PENDING" },
        });
        return user
    }

    async patchStatusCompany(id: number, status: Status): Promise<Job> {
        try {
            if (status === "DISAPPROVAL" || status === "APPROVE") {
                const user = await this.prisma.job.update({
                    where: { id },
                    data: {
                        status: status
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
