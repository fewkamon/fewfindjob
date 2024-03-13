import { Controller, UseGuards, Get, Request, Post, Body, UseInterceptors, UploadedFile, Req, BadRequestException, Patch, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleAdminGuard } from 'src/auth/role/roles.guard';
import { NewsService } from './news.service';
import { News } from '@prisma/client';
import { AdminNewsCreateDto } from './dto/create-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminNewsPatchDto } from './dto/patch-news.dto';

@UseGuards(AuthGuard, RoleAdminGuard)
@ApiBearerAuth()
@ApiTags('Admin News')
@Controller('admin/news')
export class NewsController {

    constructor(
        private readonly newsService: NewsService,
    ) { }


    @Get("/")
    async getNews(): Promise<News[]> {
        return await this.newsService.getAllNews();
    }

    @Post("/")
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                req.fileValidationError = 'Only JPG, JPEG, PNG, and GIF files are allowed!'
                return callback(null, false);
            }
            callback(null, true);
        },
    }))
    async createNews(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() body: AdminNewsCreateDto): Promise<News> {

        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('invalid file');
        }

        console.log(file);
        
        return await this.newsService.createNews(body.topic, body.detail, file);
    }

    @Patch("/:id")
    async patchStatusNews(@Param("id") param: string): Promise<News> {
        return await this.newsService.patchNews(param)
    }

}
