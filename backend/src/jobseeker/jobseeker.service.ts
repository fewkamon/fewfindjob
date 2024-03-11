import { Injectable } from '@nestjs/common';
import { Jobseeker, Prisma, RecruitmentUrgent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Steppers1PatchDto } from './dto/patch-steppers1.dto';
import { Steppers2PatchDto } from './dto/patch-steppers2.dto';
import { Steppers3PatchDto } from './dto/patch-steppers3.dto';

@Injectable()
export class JobseekerService {

    constructor(private prisma: PrismaService) { }

    async getAllJob(jobseekerId: number): Promise<RecruitmentUrgent[]> {
        return this.prisma.recruitmentUrgent.findMany({
            where: {
                jobseekerId: jobseekerId
            },
            include: {
                job: true,
                company: true
            }
        })
    }

    async changeInfoStep1(params: { where: Prisma.JobseekerWhereUniqueInput, data: Steppers1PatchDto }): Promise<Jobseeker> {
        const { where, data } = params;
        return this.prisma.jobseeker.update({
            where,
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                dob: data.birthdate,
                gender: data.gender,
                phonenumber: data.phonenumber
            },
        });
    }

    async changeInfoStep2(params: { where: Prisma.JobseekerWhereUniqueInput, data: Steppers2PatchDto }): Promise<Jobseeker> {
        const { where, data } = params;
        const { location } = data;

        return this.prisma.jobseeker.update({
            where,
            data: {
                location: {
                    update: {
                        address: location.address,
                        district: location.district,
                        subdistrict: location.subdistrict,
                        province: location.province,
                        postalCode: ~~location.postalCode,
                    },
                }
            },
        });
    }

    async changeInfoStep3(params: { where: Prisma.JobseekerWhereUniqueInput, data: Steppers3PatchDto }): Promise<Jobseeker> {
        const { where, data } = params;
        const { skill } = data;
        return this.prisma.jobseeker.update({
            where,
            data: {
                skill: {
                    update: {
                        th_typing: skill.th_typing,
                        eng_typing: skill.eng_typing,
                        driving_ability: skill.driving_ability,
                        private_vehicle: skill.private_vehicle,
                        other_special_skills: skill.other_special_skills,
                        other_experience: skill.other_experience,
                        achievements: skill.achievements,
                        references: skill.references
                    },
                }
            },
        });
    }


    async changeInfoStep4(params: { where: Prisma.JobseekerWhereUniqueInput, data: string }): Promise<Jobseeker> {
        const { where, data } = params;
        return this.prisma.jobseeker.update({
            where,
            data: {
                image: data
            },
        });
    }
}
