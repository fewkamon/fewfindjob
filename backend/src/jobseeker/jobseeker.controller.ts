import { Controller, Patch, UseGuards, Request, Body, UseInterceptors, UploadedFile, Req, BadRequestException, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JobseekerService } from './jobseeker.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Jobseeker, RecruitmentUrgent } from '@prisma/client';
import { Steppers1PatchDto } from './dto/patch-steppers1.dto';
import { RoleJobseekerGuard } from 'src/auth/role/roles.guard';
import { Steppers2PatchDto } from './dto/patch-steppers2.dto';
import { Steppers3PatchDto } from './dto/patch-steppers3.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Steppers4PatchDto } from './dto/patch-steppers4.dto';
import { diskStorage } from 'multer';
import imageSize from 'image-size';
import * as fs from 'fs'; // Import the fs module


@UseGuards(AuthGuard, RoleJobseekerGuard)
@ApiBearerAuth()
@ApiTags('Jobseeker')
@Controller('jobseeker')
export class JobseekerController {

    constructor(private jobseekerService: JobseekerService) { }

    @Get('/history/recruit')
    async doGetHistoryRecruit(@Request() req): Promise<RecruitmentUrgent[]> {
        const getAll = await this.jobseekerService.getAllJob(req.data.jobseekerId)
        return getAll
    }

    @Patch('/info/1')
    async doSteppers1Info(@Request() req, @Body() body: Steppers1PatchDto): Promise<Jobseeker> {
        const updatedCompany = await this.jobseekerService.changeInfoStep1({
            where: { userId: req.user.sub },
            data: body
        })
        return updatedCompany
    }

    @Patch('/info/2')
    async doSteppers2Info(@Request() req, @Body() body: Steppers2PatchDto): Promise<Jobseeker> {
        const updatedCompany = await this.jobseekerService.changeInfoStep2({
            where: { userId: req.user.sub },
            data: body
        })
        return updatedCompany
    }

    @Patch('/info/3')
    async doSteppers3Info(@Request() req, @Body() body: Steppers3PatchDto): Promise<Jobseeker> {
        const updatedCompany = await this.jobseekerService.changeInfoStep3({
            where: { userId: req.user.sub },
            data: body
        })
        return updatedCompany
    }

    @Patch('/info/4')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                req.fileValidationError = 'Only JPG, JPEG, PNG, and GIF files are allowed!'
                return callback(null, false);
            }
            callback(null, true);
        },
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                callback(null, `${new Date().getTime()}.jpg`);
            }
        }),
    }))
    async doSteppers4Info(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() body: Steppers4PatchDto): Promise<Jobseeker> {

        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('invalid file');
        }
        
        const dimensions = imageSize(file.path);
        const expectedWidth = 110;
        const expectedHeight = 140;
        if (dimensions.width !== expectedWidth || dimensions.height !== expectedHeight) {
            fs.unlinkSync(file.path);
            throw new BadRequestException(`ขนาดรูปต้องเป็น ${expectedWidth}x${expectedHeight} เท่านั้น`);
        }

        return await this.jobseekerService.changeInfoStep4({
            where: { userId: req.user.sub },
            data: file.filename
        })
    }

}
