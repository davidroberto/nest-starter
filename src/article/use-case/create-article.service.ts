import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleCreateDto } from '../dto/article-create.dto';

Injectable();
export class CreateArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(data: ArticleCreateDto) {
    try {
      return this.articleRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
}
