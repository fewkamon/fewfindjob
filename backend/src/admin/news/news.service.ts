import { Injectable, NotFoundException } from '@nestjs/common';
import { News, NewsStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RandomService } from 'utils/random.service';
import { AwsS3Service } from 'utils/s3.service';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService,
        private s3service: AwsS3Service,
        private randomService: RandomService) { }

    async getAllNews(): Promise<News[]> {
        const news = await this.prisma.news.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return news
    }

    async createNews(topic: string, detail: string, image: any): Promise<News> {

        const genlogo_img = this.randomService.generateRandomTextAndNumber(10, 1, 9)
        const s3logo_img = await this.s3service.uploadFile(image, `logo/${genlogo_img}`)
        console.log(s3logo_img);



        const data = await this.prisma.news.create({
            data: {
                topic: topic,
                detail: detail,
                image: s3logo_img.Location
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
