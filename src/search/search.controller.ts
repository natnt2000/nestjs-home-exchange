import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ListingFilterDto } from 'src/listings/dto/get-listings-filter.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('/:destination')
  async searchWithFilter(
    @Query(ValidationPipe) listingFilterDto: ListingFilterDto,
    @Param('destination') destination: string,
  ) {
    return await this.searchService.searchWithFilter(
      destination,
      listingFilterDto,
    );
  }
}
