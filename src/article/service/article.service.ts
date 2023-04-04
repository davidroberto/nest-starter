import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { ArticleCreateDto } from '../dto/article-create.dto';

Injectable();
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllarticles() {
    return await this.articleRepository.find();
  }

  async createArticle(data: ArticleCreateDto) {
    try {
      return this.articleRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneArticleById(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }

  async updateArticle(id: number, data: ArticleUpdateDto) {
    const article = await this.articleRepository.findOneBy({ id });
    const articleUpdate = { ...article, ...data };
    await this.articleRepository.save(articleUpdate);

    return articleUpdate;
  }
  async deleteArticle(id: number) {
    return await this.articleRepository.delete(id);
  }
}
