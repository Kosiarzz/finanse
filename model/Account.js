import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators';

export default class Account extends Model {
  static table = 'accounts'

  @text('name') name
  @field('cap') cap
  @field('tap') tap
}