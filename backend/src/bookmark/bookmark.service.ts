import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    async postData(jobId: number, jobseekerId: number): Promise<Bookmark> {
        const jobdata = await this.prisma.job.findUnique({
            where: {
                id: jobId
            }
        })

        if (!jobdata) {
            throw new NotFoundException("ไม่เจอไอดีงาน")
        } else if (jobdata.status === "PENDING" || jobdata.status === "DISAPPROVAL") {
            throw new ForbiddenException("ไม่อนุญาตให้ bookmark")
        }

        const bookmark = await this.prisma.bookmark.findFirst({
            where: {
                jobId: jobId,
                jobseekerId: jobseekerId
            }
        })

        if (bookmark) {
            throw new ConflictException("ท่านได้เคยเพิ่ม bookmark ไปแล้ว")
        }

        return await this.prisma.bookmark.create({
            data: {
                jobId: jobId,
                jobseekerId: jobseekerId
            }
        })
    }

    async getAllData(jobseekerId: number): Promise<Bookmark[]> {
        const data = await this.prisma.bookmark.findMany({
            where: {
                jobseekerId: jobseekerId
            },
            include: {
                job: {
                    include: {
                        company: {
                            include: {
                                location: true
                            }
                        }
                    }
                }
            }
        })
        return data
    }

    async getOneData(jobId: number, jobseekerId: number): Promise<Bookmark> {
        const bookmark = await this.prisma.bookmark.findFirst({
            where: {
                jobId: jobId,
                jobseekerId: jobseekerId
            }
        })
        return bookmark
    }

    async deleteData(id: number, jobseekerId: number): Promise<Bookmark> {
        const bookmark = await this.prisma.bookmark.findFirst({
            where: {
                id
            }
        })

        if (!bookmark) {
            throw new NotFoundException("ไม่เจอไอดีรายการโปรด")
        } else if (bookmark.jobseekerId !== jobseekerId) {
            throw new NotFoundException("ท่านไม่ใช่เจ้าของรายการโปรดนี้")
        }

        return this.prisma.bookmark.delete({
            where: {
                id
            }
        })
    }
}
