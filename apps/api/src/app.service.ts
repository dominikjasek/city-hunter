import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(id = 1): Promise<{ posts: Post[] }> {
    const allPosts = await this.prisma.post.findMany();
    return { posts: allPosts };
  }

  async createPost(createBookDto: Prisma.PostCreateInput): Promise<Post> {
    console.log(createBookDto);
    return this.prisma.post.create({ data: createBookDto });
  }
}
