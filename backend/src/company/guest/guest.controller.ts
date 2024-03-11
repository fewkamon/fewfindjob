import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GuestService } from './guest.service';
import { Company } from '@prisma/client';

@ApiTags('Company Guest')
@Controller('company')
export class GuestController {
    constructor(private guestService: GuestService) { }

    @Get('/')
    async doCompanyAll(): Promise<{ id: number; companyname: string; name: string; image: string; }[]> {
        const getCompany = await this.guestService.getAllCompany()
        return getCompany
    }

    @Get('/:id')
    async doCompanyOne(@Param("id") param: number): Promise<Company> {
        const getCompany = await this.guestService.getOneCompany(param)
        return getCompany
    }

}
