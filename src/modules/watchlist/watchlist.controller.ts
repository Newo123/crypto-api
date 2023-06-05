import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import {
  CreateAssetResponse,
  GetUserAssetsResponse,
} from './create-watchList.response';
import { WatchListDto } from './dto/watchlist.dto';
import { WatchListModel } from './watchlist.model';
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
    const { id } = request.user;
    return this.watchListService.create(id, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: GetUserAssetsResponse })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('get-elements')
  async getUserAsset(@Req() request): Promise<WatchListModel[]> {
    const { id } = await request.user;
    return this.watchListService.getUserAsset(id);
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
