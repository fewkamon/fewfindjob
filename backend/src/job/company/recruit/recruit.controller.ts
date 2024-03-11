import { Controller, Request, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecruitService } from './recruit.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleCompanyGuard } from 'src/auth/role/roles.guard';
import { RecruitmentFile, RecruitmentUrgent } from '@prisma/client';
import { RecruitUrgentPatdchDto } from './dto/recruit-urgent-patch.dto';

@UseGuards(AuthGuard, RoleCompanyGuard)
@ApiBearerAuth()
@ApiTags('Job Company Recruit')
@Controller('job/company/recruit')
export class RecruitController {
    constructor(private recruitService: RecruitService) { }

    @Get("/urgent")
    async getJobCompany(@Request() req: any): Promise<RecruitmentUrgent[]> {
        return this.recruitService.findAllRecruitUrgent(req.data.company.id)
    }

    @Patch("/urgent")
    async patchJobCompany(@Request() req: any, @Body() body: RecruitUrgentPatdchDto): Promise<RecruitmentUrgent> {
        return this.recruitService.patchRecruitUrgent(req.data.company.id, body.recruitid, body.type)
    }

    @Get("/file")
    async getJobCompany1(@Request() req: any): Promise<RecruitmentFile[]> {
        return this.recruitService.findAllRecruitFile(req.data.company.id)
    }

    @Patch("/file")
    async patchJobCompany1(@Request() req: any, @Body() body: RecruitUrgentPatdchDto): Promise<RecruitmentFile> {
        return this.recruitService.patchRecruitFile(req.data.company.id, body.recruitid, body.type)
    }



}
