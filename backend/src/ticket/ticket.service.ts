import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from '@prisma/client';

@Injectable()
export class TicketService {
    constructor(private prisma: PrismaService) { }

    async createTicket(data: CreateTicketDto): Promise<Ticket> {
        return this.prisma.ticket.create({
            data: {
                topic: data.topic,
                email: data.email,
                phonenumber: data.phonenumber,
                name: data.name,
                message: data.message
            }
        })
    }

    async fetchTicket(): Promise<Ticket[]> {
        return this.prisma.ticket.findMany()
    }

}
