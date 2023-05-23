import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAssetResponse } from './create-watchList.response';
import { WatchListDto } from './dto/watchlist.dto';
import { WatchListModel } from './watchlist.model';

@Injectable()
export class WatchListService {
  constructor(
    @InjectModel(WatchListModel)
    private readonly watchList: typeof WatchListModel,
  ) {}

  async create(
    userId: number,
    dto: WatchListDto,
  ): Promise<CreateAssetResponse> {
    const watchList = {
      user: userId,
      name: dto.name,
      assetId: dto.assetId,
    };

    await this.watchList.create(watchList);
    return watchList;
  }

  async delete(userId: number, assetId: string): Promise<boolean> {
    const deleteAsset = await this.watchList.destroy({
      where: { id: assetId, user: userId },
    });

    const isDeleted = (await deleteAsset) ? true : false;
    return isDeleted;
  }
}
