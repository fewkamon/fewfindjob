import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';
import { JobModule } from './job/job.module';
import { JobseekerModule } from './jobseeker/jobseeker.module';
import { FileModule } from './file/file.module';
import { NewsModule } from './news/news.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    CompanyModule, 
    AdminModule, 
    JobModule, 
    JobseekerModule, FileModule, NewsModule, BookmarkModule, TicketModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
