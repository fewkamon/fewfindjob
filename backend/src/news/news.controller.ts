import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { News } from '@prisma/client';

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @Get('/')
    async doGetAll(): Promise<News[]> {
        const getNews = await this.newsService.getNews()
        return getNews
    }

    @Get('/limit')
    async doGetLimit8(): Promise<News[]> {
        const getNews = await this.newsService.getLimit()
        return getNews
    }

    @Get('/:id')
    async doGetOne(@Param("id") paramDto: number): Promise<{ data: News, top: News[] }> {
        const getNews = await this.newsService.getWithID(~~paramDto)
        const getTop = await this.newsService.getTop()
        return { data: getNews, top: getTop }
    }
}
