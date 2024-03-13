import { Controller, Post, UseGuards, Request, Body, Patch, UseInterceptors, Req, UploadedFile, BadRequestException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyInfoRequestDto } from './dto/company-info.dto';
import { Company } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CompanyLogo } from './dto/company-logo.dto';
import imageSize from 'image-size';
import * as fs from 'fs';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Company')
@Controller('company')
export class CompanyController {

    constructor(private companyService: CompanyService) { }

    @Patch('/info')
    async doCompanyChangeInfo(@Request() req, @Body() companyInfo: CompanyInfoRequestDto): Promise<Company> {
        const updatedCompany = await this.companyService.changeInfo({
            where: { userId: req.user.sub },
            data: companyInfo
        })
        return updatedCompany
    }


    @Patch('/logo')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                req.fileValidationError = 'Only JPG, JPEG, PNG, and GIF files are allowed!'
                return callback(null, false);
            }
            callback(null, true);
        }
    }))
    async doSteppers4Info(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() body: CompanyLogo): Promise<Company> {

        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('invalid file');
        }
        
        return await this.companyService.upLoadLogo({
            where: { userId: req.user.sub },
            data: file
        })
    }


}
