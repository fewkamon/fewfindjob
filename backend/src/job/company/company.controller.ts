import { Body, Controller, Post, UseGuards, Request, Put, Delete, Param, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CompanyRegisterCompanyDto } from './dto/company-create.dto';
import { Job } from '@prisma/client';
import { RoleCompanyGuard } from 'src/auth/role/roles.guard';

@UseGuards(AuthGuard, RoleCompanyGuard)
@ApiBearerAuth()
@ApiTags('Job Company')
@Controller('job/company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get("/")
    async getJobCompany(@Request() req: any): Promise<Job[]> {
        const getCompany = await this.companyService.findAllPostjob(req.data.company.id)
        return getCompany
    }

    @Get("/:id")
    async getOneJobCompany(@Request() req: any, @Param("id") param: number): Promise<Job> {
        const getCompany = await this.companyService.findOnePostjob(req.data.company.id, param)
        return getCompany
    }

    @Post("/")
    async createJobCompany(@Request() req: any, @Body() body: CompanyRegisterCompanyDto): Promise<Job> {
        const createCompany = await this.companyService.createPostjob(req.data.company.id, body)
        return createCompany
    }

    @Put("/:id")
    async changeJobCompany(@Request() req: any, @Param("id") param: number, @Body() body: CompanyRegisterCompanyDto): Promise<Job> {
        const updatedCompany = await this.companyService.putPostjob(req.data.company.id, param, body)
        return updatedCompany
    }

    @Delete("/:id")
    async deleteJobCompany(@Request() req: any, @Param("id") param: number): Promise<Job> {
        const deletedCompany = await this.companyService.deletePostjob(req.data.company.id, param)
        return deletedCompany
    }
}
