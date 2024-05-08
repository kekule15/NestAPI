import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreatBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

import {Query as ExpressQuery } from 'express-serve-static-core'

@Controller('book')
export class BookController {

    constructor(private bookService: BookService) { }

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findBooks(query)
    }

    @Get('search')
    async searchBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.searchBooks(query)
    }

    @Post('create')
    async createBook(@Body() book: CreatBookDTO): Promise<Book> {
        return this.bookService.create(book)
    }

    @Get(':id')
    async findBook(@Param('id') id: string): Promise<Book> {
        return this.bookService.findBookById(id)
    }

    @Put(':id')
    async updateBook(
        @Param('id') id: string,
        @Body() book: UpdateBookDTO
    ): Promise<Book> {
        return this.bookService.updateBookById(id, book)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book> {
        return this.bookService.deleteBookById(id)
    }
}
