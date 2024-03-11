import { Controller, Get, Post, Body, UseGuards, Request, ExecutionContext, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AdminCompanyService } from './company.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Status, User as UserModel } from '@prisma/client';
import { RoleAdminGuard } from 'src/auth/role/roles.guard';

@UseGuards(AuthGuard, RoleAdminGuard)
@ApiBearerAuth()
@ApiTags('Admin Company')
@Controller('admin/company')
export class AdminCompanyController {
    constructor(
        private readonly adminService: AdminCompanyService,
    ) { }

    @Get("/")
    async getAllCompany(@Request() req): Promise<UserModel[]> {
        return await this.adminService.getAllCompany();
    }

    @Get("pending")
    async getCompany(@Request() req): Promise<UserModel[]> {
        return await this.adminService.getPendingCompany();
    }

    @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
    @ApiParam({ name: 'status', type: 'string', description: 'Status' })
    @Patch(":id/:status")
    async patchStatusCompany(@Param() params: { id: string, status: Status }): Promise<UserModel> {
        return await this.adminService.patchStatusCompany(~~params.id, params.status);
    }
}
