import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {

    }

    async findBooks(query: Query): Promise<Book[]> {

        // Add Pagination
        const resPerPage: number = 2
        const currangePage: number = Number(query.page) || 1

        const skip: number = resPerPage * (currangePage - 1)

        const books = await this.bookModel.find().limit(resPerPage).skip(skip);
        return books;

    }

    async searchBooks(query: Query): Promise<Book[]> {
        console.log(query)
        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            },
            month: {
                $regex: query.keyword,
                $options: 'i'
            },
            year: {
                $regex: query.keyword,
                $options: 'i'
            }

        } : {}
        const books = await this.bookModel.find({ ...keyword });
        return books;

    }

    async create(book: Book): Promise<Book> {

        try {
            const res = await this.bookModel.create(book);
            return res;
        } catch (error) {
            console.log(error)
        }

    }

    async findBookById(id: string): Promise<Book> {

        const isValidId: boolean = mongoose.isValidObjectId(id)


        if (!isValidId) {

            throw new NotFoundException("Please enter a valid book Id");
        }

        const book = await this.bookModel.findById(id);
        if (!book) {

            throw new NotFoundException("Book not found");
        }
        return book;

    }

    async updateBookById(id: string, book: Book): Promise<Book> {

        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        });

    }
    async deleteBookById(id: string): Promise<Book> {

        const book = await this.bookModel.findByIdAndDelete(id);
        if (!book) {

            throw new NotFoundException("Book not found");
        }
        return book;

    }



}
