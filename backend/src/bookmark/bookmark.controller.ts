import { Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleJobseekerGuard } from 'src/auth/role/roles.guard';
import { Bookmark } from '@prisma/client';

@UseGuards(AuthGuard, RoleJobseekerGuard)
@ApiBearerAuth()
@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) { }

    @Get('/')
    async doGetAllBookmark(@Request() req): Promise<any> {
        return this.bookmarkService.getAllData(req.data.jobseeker.id)
    }

    @Get('/:id')
    async doGetBookmark(@Request() req, @Param("id") param: string): Promise<Bookmark> {
        return this.bookmarkService.getOneData(~~param, req.data.jobseeker.id)
    }

    @Post('/:id')
    async doAddBookmark(@Request() req, @Param("id") param: string): Promise<Bookmark> {
        return this.bookmarkService.postData(~~param, req.data.jobseeker.id)
    }

    @Delete('/:id')
    async doDeleteBookmark(@Request() req, @Param("id") param: string): Promise<Bookmark> {
        return this.bookmarkService.deleteData(~~param, req.data.jobseeker.id)
    }

}
