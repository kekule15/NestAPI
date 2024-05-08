import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";

export class CreatBookDTO {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, {message: "Please input a valid category type"})
    readonly category: Category

}