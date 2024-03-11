import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job, JobType } from '@prisma/client';
import { JobGetDto } from './dto/job-get.dto';
import { JobGetOneDto } from './dto/job-getone.dto';

@ApiTags('Job')
@Controller('job')
export class JobController {
    constructor(private jobService: JobService) { }

    @Get('/filter')
    async doGetAll(@Query() queryDto: JobGetDto): Promise<Job[]> {
        const data: JobType[] = queryDto.type === "all" ? ["FULL_TIME", "FREELANCE", "INTERNSHIP", "PART_TIME"] : queryDto.type.split(',').map((type) => type.trim() as JobType);
        const result = await this.jobService.doGetAll(queryDto.keyword, data)
        return result
    }

    @Get('/id/:id')
    async doGetWithID(@Param() paramDto: JobGetOneDto): Promise<any> {
        const result = await this.jobService.doGetOne(paramDto.id)
        return result
    }


}
