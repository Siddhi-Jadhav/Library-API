import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorators';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create.book.dto';
import { IssuedBookDTO } from './dto/issued.book.dto';
import { ReturnBookDTO } from './dto/return.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDTO): Promise<BookEntity> {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  getBooks(@Query() searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    return this.bookService.getBooks(searchBookDto);
  }

  @Put('/:id')
  updateBook(@Body() updateBookDto: UpdateBookDTO, @Param('id') id: number) {
    return this.bookService.updateBook(updateBookDto, id);
  }

  @Patch()
  issuedBook(@Body() issuedBookDto: IssuedBookDTO) {
    return this.bookService.issuedBook(issuedBookDto);
  }

  @Delete()
  returnBook(
    @GetUser() user: UserEntity,
    @Body() returnBookDto: ReturnBookDTO,
  ) {
    return this.bookService.returnBook(returnBookDto, user);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}
