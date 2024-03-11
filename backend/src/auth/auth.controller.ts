import { Controller, Get, Post, Body, UseGuards, Request, ExecutionContext, Patch } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { AuthRegisterJobSeekerDto } from './dto/create-jobseeker.dto';
import { AuthRegisterCompanyDto } from './dto/create-company.dto';
import { AuthLoginDto } from './dto/login.dto'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthChangepasswordDto } from './dto/patch-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("/me")
    async me(@Request() req): Promise<UserModel> {
        return await this.authService.me(req.user.sub);
    }

    @Post("/signin")
    async signin(@Body() userData: AuthLoginDto): Promise<{ access_token: string }> {
        return await this.authService.signIn(userData);
    }

    @Post("/signup/jobseeker")
    async signupJobseeker(@Body() userData: AuthRegisterJobSeekerDto): Promise<UserModel> {
        return await this.authService.createJobseeker(userData);
    }

    @Post("/signup/company")
    async signupCompany(@Body() userData: AuthRegisterCompanyDto): Promise<UserModel> {
        return await this.authService.createCompany(userData);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch("/changepassword")
    async changePassword(@Request() req, @Body() userData: AuthChangepasswordDto): Promise<UserModel> {
        return await this.authService.changePassword(req.user.sub, userData);
    }

}
