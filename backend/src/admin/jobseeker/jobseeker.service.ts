import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel, Status } from '@prisma/client';

@Injectable()
export class JobseekerService {
    constructor(private prisma: PrismaService) { }

    async getAllJobseeker(): Promise<UserModel[]> {
        const user = await this.prisma.user.findMany({
            where: { role: "JOB_SEEKER" },
            include: {
                jobseeker: {
                    include: {
                        location: true,
                        skill: true
                    }
                },
            },
        });

        console.log(user);
        
        delete user["password"]
        return user
    }
}
