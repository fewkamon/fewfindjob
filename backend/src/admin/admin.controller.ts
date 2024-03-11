import { Controller, Get, Post, Body, UseGuards, Request, ExecutionContext } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) { }

  
}
