import { Controller, UseGuards, Get, Request, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JobService } from './job.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleAdminGuard } from 'src/auth/role/roles.guard';
import { Status, Job } from '@prisma/client';

@UseGuards(AuthGuard, RoleAdminGuard)
@ApiBearerAuth()
@ApiTags('Admin Company Job')
@Controller('admin/company/job')
export class JobController {
    constructor(
        private readonly jobService: JobService,
    ) { }


    @Get("pending")
    async getCompany(@Request() req): Promise<Job[]> {
        return await this.jobService.getPendingJobCompany();
    }

    @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
    @ApiParam({ name: 'status', type: 'string', description: 'Status' })
    @Patch("/:id/:status")
    async patchStatusCompany(@Param() params: { id: string, status: Status }): Promise<Job> {
        return await this.jobService.patchStatusCompany(~~params.id, params.status);
    }
}
