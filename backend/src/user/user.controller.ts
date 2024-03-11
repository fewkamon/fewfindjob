import { Controller, Post, Body, Request, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from './../auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // @UseGuards(AuthGuard)
    // @ApiBearerAuth()
    // @Post('/company/info')
    // async doCompanyChangeInfo(@Request() req, @Body() userInfo: CompanyInfoRequestDto): Promise<void> {
    //     this.userService.changeInfo({
    //         where: { id: req.user.sub },
    //         data: {
    //             email: userInfo.companyname
    //         }
    //     })
    // }
}
