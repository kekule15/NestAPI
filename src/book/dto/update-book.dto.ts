import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";

export class UpdateBookDTO {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, {message: "Please input a valid category type"})
    readonly category: Category

}