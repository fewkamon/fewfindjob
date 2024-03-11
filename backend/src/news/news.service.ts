import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NewsService {

    constructor(private prisma: PrismaService) { }

    async getNews(): Promise<News[]> {
        return this.prisma.news.findMany({
            where: { status: "PUBLIC" }, orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async getWithID(id: number): Promise<News> {

        const data = await this.prisma.news.findUnique({
            where: {
                id: id
            },
        })

        if (!data) {
            throw new NotFoundException("ไม่เจอไอดีที่ประกาศ")
        }

        await this.prisma.news.update({
            where: {
                id: id
            },
            data: {
                view: {
                    increment: 1,
                }
            }
        })

        return this.prisma.news.findFirst({
            where: { id: id, status: "PUBLIC" }, orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async getLimit(): Promise<News[]> {
        return this.prisma.news.findMany({
            where: { status: "PUBLIC" }, take: 8, orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async getTop(): Promise<News[]> {
        return this.prisma.news.findMany({
            where: { status: "PUBLIC" }, take: 6, orderBy: {
                view: 'desc',
            },
        })
    }

}
