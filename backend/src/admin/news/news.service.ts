import { Injectable, NotFoundException } from '@nestjs/common';
import { News, NewsStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) { }

    async getAllNews(): Promise<News[]> {
        const news = await this.prisma.news.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return news
    }

    async createNews(topic: string, detail: string, image: string): Promise<News> {
        const data = await this.prisma.news.create({
            data: {
                topic: topic,
                detail: detail,
                image: image
            },
        });
        return data
    }


    async patchNews(id: string): Promise<News> {
        const newsdata = await this.prisma.news.findUnique({
            where: {
                id: ~~id
            }
        })

        if (!newsdata) {
            throw new NotFoundException("ไม่เจอไอดีที่จะสมัครงาน")
        }

        const data = await this.prisma.news.update({
            where: { id: ~~id },
            data: {
                status: newsdata.status === "PRIVATE" ? "PUBLIC" : "PRIVATE"
            },
        });
        return data
    }
}
