import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users'

  @text('username') username
  @text('email') email
  @text('avatar') avatar
  @boolean('tutorial_completed') tutorial_completed
  @boolean('in_group') in_group
}