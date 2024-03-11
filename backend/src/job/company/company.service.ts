import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Job } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CompanyRegisterCompanyDto } from './dto/company-create.dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) { }

    async findAllPostjob(companyId: number): Promise<Job[]> {
        return await this.prisma.job.findMany({
            where: {
                companyId: companyId
            }
        })
    }

    async findOnePostjob(companyId: number, id: number): Promise<Job> {
        return await this.prisma.job.findFirst({
            where: {
                companyId: ~~companyId,
                id: ~~id
            }
        })
    }

    async createPostjob(id: number, data: CompanyRegisterCompanyDto): Promise<Job> {
        const { title, type, salary, employeeCount, description, qualifications, how_to_apply, contact } = data
        return await this.prisma.job.create({
            data: {
                title: title,
                salary,
                jobType: type,
                qualification: qualifications,
                how_to_apply: how_to_apply,
                contact: contact,
                amount: employeeCount,
                detail: description,
                companyId: id
            }
        })
    }

    async putPostjob(companyid: number, id: number, data: CompanyRegisterCompanyDto): Promise<Job> {
        const { title, type, salary, employeeCount, description, qualifications, how_to_apply, contact } = data
        const test = await this.prisma.job.findUnique({ where: { id: ~~id } })
        if (companyid !== test.companyId) {
            throw new ConflictException("ไอดีที่สร้างโพสต์ไม่ถูกต้อง")
        }
        return await this.prisma.job.update({
            where: { id: ~~id },
            data: {
                title: title,
                salary,
                jobType: type,
                qualification: qualifications,
                how_to_apply: how_to_apply,
                contact: contact,
                amount: employeeCount,
                detail: description,
                status: "PENDING"
            }
        })
    }

    async deletePostjob(companyid: number, id: number): Promise<Job> {
        const test = await this.prisma.job.findUnique({ where: { id: ~~id } })
        if (!test) {
            throw new NotFoundException("ไม่เจอโพสต์ที่ต้องการจะลบ")
        }
        if (companyid !== test.companyId) {
            throw new ConflictException("ไอดีที่สร้างโพสต์ไม่ถูกต้อง")
        }
        return await this.prisma.job.delete({ where: { id: ~~id } })
    }

}
