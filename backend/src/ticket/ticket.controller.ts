import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleAdminGuard } from 'src/auth/role/roles.guard';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) { }

    @Post('/')
    async doCreateTicket(@Body() body: CreateTicketDto): Promise<Ticket> {
        return await this.ticketService.createTicket(body)
    }

    @UseGuards(AuthGuard, RoleAdminGuard)
    @ApiBearerAuth()
    @Get('/')
    async doGetAllTicket(): Promise<Ticket[]> {
        return await this.ticketService.fetchTicket()
    }

}
