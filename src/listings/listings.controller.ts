import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateListingDto } from './dto/create-listing.dto';
import { ListingsService } from './listings.service';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/edit-filename.helper';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  async getAllListings(@Query(ValidationPipe) filterDto: GetListingsFilterDto) {
    return await this.listingsService.getAllListings(filterDto);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async createListing(
    @Body(ValidationPipe) createListingDto: CreateListingDto,
    @UploadedFile() image: any,
  ) {
    if (!image) {
      throw new BadRequestException(['image photo is required'], 'Bad Request');
    }

    return await this.listingsService.createListing(createListingDto, image);
  }
}
