import {Injectable, NotFoundException} from '@nestjs/common';
import { getDb } from "../database/db";


@Injectable()
export class ProductsService {
    private db;

    constructor(){
    this.db = getDb()
    }

    async findAll(itemGroup: string) {
        // console.log(this.db.collection('products').findAll({'itemGroup': 'phones'}))
        try {
            return await this.db.collection('products').find({'itemGroup': itemGroup.toString()}).toArray();
        }
        catch(err) {
            throw new NotFoundException(`Item with ${itemGroup} not found`);
        }
    }

}

