import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateListingDto } from './dto/create-listing.dto';
import { ListingsService } from './listings.service';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/edit-filename.helper';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('listings')
@UseGuards(AuthGuard())
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  async getAllListings(@GetUser() user: User) {
    return await this.listingsService.getAllListings(user);
  }

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        // destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async createListing(
    @Body(ValidationPipe) createListingDto: CreateListingDto,
    @UploadedFiles() images: any[],
    @GetUser() user: User,
  ) {
    return await this.listingsService.createListing(
      createListingDto,
      images,
      user,
    );
  }
}
