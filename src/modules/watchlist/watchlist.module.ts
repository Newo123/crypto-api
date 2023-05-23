import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchListController } from './watchlist.controller';
import { WatchListModel } from './watchlist.model';
import { WatchListService } from './watchlist.service';

@Module({
  imports: [SequelizeModule.forFeature([WatchListModel])],
  controllers: [WatchListController],
  providers: [WatchListService],
})
export class WatchListModule {}
