import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { ArticleCreateDto } from '../dto/article-create.dto';
import { ArticleUpdateDto } from '../dto/article-update.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getAllArticles() {
    return this.articleService.getAllarticles();
  }

  @Get(':id')
  getOneArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getOneArticleById(id);
  }

  @Post()
  createArticle(@Body() data: ArticleCreateDto) {
    return this.articleService.createArticle(data);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ArticleUpdateDto,
  ) {
    return this.articleService.updateArticle(id, data);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle(id);
  }
}
