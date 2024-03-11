import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, RecruitmentFile, RecruitmentUrgent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobseekerService {
    constructor(private prisma: PrismaService) { }

    async recruitUrgent(jobId: number, jobSeeker: number): Promise<RecruitmentUrgent> {
        const data = await this.prisma.job.findUnique({
            where: {
                id: jobId
            }
        })

        if (!data) {
            throw new NotFoundException("ไม่เจอไอดีที่จะสมัครงาน")
        }

        const data1 = await this.prisma.recruitmentUrgent.findFirst({
            where: {
                jobId: jobId,
                jobseekerId: jobSeeker,
                companyId: data.companyId
            }
        })

        if (data1) {
            throw new ConflictException("ท่านได้เคยสมัครงานที่นี้ไปแล้วไม่สามารถกดซ้ำ")
        }

        return await this.prisma.recruitmentUrgent.create({
            data: {
                jobId: jobId,
                jobseekerId: jobSeeker,
                companyId: data.companyId
            }
        })
    }

    async recruitFile(jobId: number, email: string, file_name: string): Promise<RecruitmentFile> {
        const data = await this.prisma.job.findUnique({
            where: {
                id: jobId
            }
        })

        if (!data) {
            throw new NotFoundException("ไม่เจอไอดีที่จะสมัครงาน")
        }

        return await this.prisma.recruitmentFile.create({
            data: {
                jobId: jobId,
                email: email,
                file: file_name,
                companyId: data.companyId
            }
        })
    }
}
