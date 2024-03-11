import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) { }

    async doGetAll(keyword: string, data: JobType[]): Promise<Job[]> {
        return this.prisma.job.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword,
                        },
                    },
                    {
                        company: {
                            companyname: {
                                contains: keyword
                            }
                        },
                    }
                ],
                status: "APPROVE",
                jobType: {
                    in: data
                }
            },
            include: {
                company: {
                    select: {
                        companyname: true,
                        image: true,
                        location: {
                            select: {
                                province: true,
                                district: true,
                                subdistrict: true
                            }
                        }
                    },
                }
            },
        });
    }

    async doGetOne(id: string): Promise<any> {

        const data = await this.prisma.job.findUnique({
            where: {
                id: ~~id
            },
            include: {
                company: {
                    select: {
                        companyname: true,
                        image: true,
                        location: {
                            select: {
                                province: true,
                                district: true,
                                subdistrict: true
                            }
                        }
                    },
                }
            },
        })

        const dx = await this.prisma.job.findMany({
            where: {
                companyId: data.companyId,
                status: "APPROVE",
                NOT: {
                    id: data.id,
                },
            },
            take: 8
        })

        if (!data) {
            throw new NotFoundException("ไม่เจอ ID งานนี้ในระบบ")
        }

        return { data, more: dx }
    }
}
