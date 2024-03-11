import { ConflictException, Injectable } from '@nestjs/common';
import { RecruitStatus, RecruitmentFile, RecruitmentUrgent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecruitService {
    constructor(private prisma: PrismaService) { }

    async findAllRecruitUrgent(companyId: number): Promise<RecruitmentUrgent[]> {
        return await this.prisma.recruitmentUrgent.findMany({
            where: {
                companyId: companyId
            },
            include: {
                job: true,
                jobseeker: {
                    include: {
                        location: true,
                        skill: true,
                    }
                }
            }
        })
    }

    async findAllRecruitFile(companyId: number): Promise<RecruitmentFile[]> {
        return await this.prisma.recruitmentFile.findMany({
            where: {
                companyId: companyId
            },
            include: {
                job: true
            }
        })
    }

    async patchRecruitFile(companyId: number, id: number, status: RecruitStatus): Promise<RecruitmentFile> {
        const test = await this.prisma.recruitmentFile.findUnique({ where: { id: ~~id } })
        if (companyId !== test.companyId) {
            throw new ConflictException("ไอดีบริษัทไม่ถูกต้อง")
        }
        return await this.prisma.recruitmentFile.update({
            where: {
                id: test.id
            },
            data: {
                status: status
            }
        })
    }

    async patchRecruitUrgent(companyId: number, id: number, status: RecruitStatus): Promise<RecruitmentUrgent> {
        const test = await this.prisma.recruitmentUrgent.findUnique({ where: { id: ~~id } })
        if (companyId !== test.companyId) {
            throw new ConflictException("ไอดีบริษัทไม่ถูกต้อง")
        }
        return await this.prisma.recruitmentUrgent.update({
            where: {
                id: test.id
            },
            data: {
                status: status
            }
        })
    }
}
