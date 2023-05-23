import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateAssetResponse } from './create-watchList.response';
import { WatchListDto } from './dto/watchlist.dto';
import { WatchListService } from './watchlist.service';

@Controller('watchList')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: WatchListDto,
    @Req() request,
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchListService.create(user, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = await request.user;
    return this.watchListService.delete(id, assetId);
  }
}
