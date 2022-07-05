import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/server/common/pagination/pagination';
import { Post } from './post.model';

@ObjectType()
export class PostConnection extends PaginatedResponse(Post) {}
