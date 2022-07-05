import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/server/users/models/user.model';
import { BaseModel } from 'src/server/common/models/base.model';

@ObjectType()
export class Post extends BaseModel {
  title: string;
  content: string;
  published: boolean;
  author: User;
}
