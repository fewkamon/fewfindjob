import { Controller, UseGuards, Get, Request, Post, Body, UseInterceptors, UploadedFile, Req, BadRequestException, Patch, Param } from '@nestjs/common';
import { JobseekerService } from './jobseeker.service';
import { User as UserModel, Status } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleAdminGuard } from 'src/auth/role/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Admin Jobseeker')
@Controller('admin/jobseeker')
export class JobseekerController {
    constructor(
        private readonly jobseekerService: JobseekerService,
    ) { }

    @Get("/")
    async getNews(): Promise<UserModel[]> {
        return await this.jobseekerService.getAllJobseeker();
    }

}
