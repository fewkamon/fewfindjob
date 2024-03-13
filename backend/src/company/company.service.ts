import { Injectable } from '@nestjs/common';
import { Company, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CompanyInfoRequestDto } from './dto/company-info.dto';
import { AwsS3Service } from 'utils/s3.service';
import { RandomService } from 'utils/random.service';

@Injectable()
export class CompanyService {
    constructor(
        private prisma: PrismaService,
        private s3service: AwsS3Service,
        private randomService: RandomService
    ) { }

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

    async upLoadLogo(params: { where: Prisma.CompanyWhereUniqueInput, data: any }): Promise<Company> {
        const { where, data } = params;

        const genlogo_img = this.randomService.generateRandomTextAndNumber(10, 1, 9)
        const s3logo_img = await this.s3service.uploadFile(data, `logo/${genlogo_img}`)
        console.log(s3logo_img);



        const result = await this.prisma.company.update({
            where,
            data: {
                image: s3logo_img.Location
            },
        });


        console.log(result);
        
        return result
    }

}
