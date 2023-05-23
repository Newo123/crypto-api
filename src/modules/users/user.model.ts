import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { WatchListModel } from '../watchlist/watchlist.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  userName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => WatchListModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchList: WatchListModel[];
}
