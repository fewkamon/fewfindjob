import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class RoleAdminGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { sub } = request.user;
        try {
            const data = await this.prisma.user.findUnique({ where: { id: sub } })
            if (data.role !== "ADMIN") {
                throw new UnauthorizedException("This user is not an admin role.");
            }
            request["data"] = data
            return true
        } catch (error) {
            if (error.response) {
                throw new UnauthorizedException(error.response.message)
            } else {
                throw new UnauthorizedException("Error fetching user roles");
            }
        }
    }
}

@Injectable()
export class RoleCompanyGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { sub } = request.user;
        try {
            const data = await this.prisma.user.findUnique({ where: { id: sub }, include: { company: true } })
            if (data.role !== "COMPANY") {
                throw new UnauthorizedException("This user is not an COMPANY role.");
            }
            request["data"] = data
            return true
        } catch (error) {
            if (error.response) {
                throw new UnauthorizedException(error.response.message)
            } else {
                throw new UnauthorizedException("Error fetching user roles");
            }
        }
    }
}

@Injectable()
export class RoleJobseekerGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { sub } = request.user;
        try {
            const data = await this.prisma.user.findUnique({ where: { id: sub }, include: { jobseeker: true } })
            if (data.role !== "JOB_SEEKER") {
                throw new UnauthorizedException("This user is not an JOB_SEEKER role.");
            }
            request["data"] = data
            return true
        } catch (error) {
            if (error.response) {
                throw new UnauthorizedException(error.response.message)
            } else {
                throw new UnauthorizedException("Error fetching user roles");
            }
        }
    }
}