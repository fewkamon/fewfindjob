import { Controller, Get, UseGuards, Request, Post, Body, UseInterceptors, UploadedFile, Req, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleJobseekerGuard } from 'src/auth/role/roles.guard';
import { JobseekerService } from './jobseeker.service';
import { JobseekerRecruitUrgentDto } from './dto/jobseeker-recruit-urgent.dto';
import { RecruitmentUrgent } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JobseekerRecruitFileDto } from './dto/create-jobseeker.dto';

@ApiTags('Job Jobseeker')
@Controller('job/jobseeker')
export class JobseekerController {
    constructor(private jobseekerService: JobseekerService) { }

    @UseGuards(AuthGuard, RoleJobseekerGuard)
    @ApiBearerAuth()
    @Post("/recruit/urgent")
    async recruiturgentJobCompany(@Request() req, @Body() body: JobseekerRecruitUrgentDto): Promise<RecruitmentUrgent> {
        return this.jobseekerService.recruitUrgent(body.id, req.data.jobseeker.id)
    }

    @Post("/recruit/file")
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(pdf|jpg|jpeg|png|gif)$/)) {
                req.fileValidationError = 'Only PDF, JPG, JPEG, PNG, and GIF files are allowed!'
                return callback(null, false);
            }
            callback(null, true);
        },
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                callback(null, `${new Date().getTime()}.${file.mimetype.split("/")[1]}`);
            }
        }),
    }))
    async recruitfileJobCompany(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() body: JobseekerRecruitFileDto): Promise<any> {

        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('invalid file');
        }
        
        return await this.jobseekerService.recruitFile(~~body.id, body.email, file.filename)
    }
   

}
