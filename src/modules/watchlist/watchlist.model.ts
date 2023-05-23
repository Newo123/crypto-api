import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({ tableName: 'watchList' })
export class WatchListModel extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  name: string;

  @Column
  assetId: string;
}
