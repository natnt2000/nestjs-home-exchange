import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ListingFilterDto } from '../listings/dto/get-listings-filter.dto';
import { SearchService } from './search.service';
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('/:destination')
  @ApiOperation({ summary: 'Search and filter' })
  @ApiOkResponse({ type: Object, isArray: true })
  @ApiParam({
    name: 'destination',
    description: 'Destination',
    required: true,
    type: String,
    example: 'everywhere',
  })
  async searchWithFilter(
    @Query(ValidationPipe) listingFilterDto: ListingFilterDto,

    @Param('destination')
    destination: string,
  ) {
    return this.searchService.searchWithFilter(destination, listingFilterDto);
  }
}
