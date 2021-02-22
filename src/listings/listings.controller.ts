import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateListingDto } from './dto/create-listing.dto';
import { ListingsService } from './listings.service';
import { diskStorage } from 'multer';
import { editFileName } from '../helpers/edit-filename.helper';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetUserInterface } from 'src/auth/interfaces/get-user.interface';
import { IListing } from './interfaces/listing.interface';

@UseGuards(AuthGuard())
@Controller('listings')
@ApiBearerAuth()
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user listings' })
  @ApiOkResponse({ type: Object, isArray: true })
  async getAllListings(@GetUser() user: GetUserInterface): Promise<IListing[]> {
    return this.listingsService.getAllListings(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create listing' })
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
    @GetUser() user: GetUserInterface,
  ): Promise<IListing> {
    return this.listingsService.createListing(createListingDto, images, user);
  }
}
