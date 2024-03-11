import { Injectable } from '@nestjs/common';
import { Company, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CompanyInfoRequestDto } from './dto/company-info.dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) { }

    async changeInfo(params: { where: Prisma.CompanyWhereUniqueInput, data: CompanyInfoRequestDto }): Promise<Company> {
        const { where, data } = params;
        const { location, ...updateData } = data;
        return this.prisma.company.update({
            where,
            data: {
                companyname: updateData.companyname,
                phonenumber: updateData.phonenumber,
                status: "CHECK",
                description: updateData.description,
                benefits: updateData.benefits,
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

    async upLoadLogo(params: { where: Prisma.CompanyWhereUniqueInput, data: string }): Promise<Company> {
        const { where, data } = params;
        return this.prisma.company.update({
            where,
            data: {
                image: data
            },
        });
    }

}
