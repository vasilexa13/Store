import {Injectable, NotFoundException} from '@nestjs/common';
import { getDb } from "../database/db";


@Injectable()
export class ProductsService {
    private db;

    constructor(){
    this.db = getDb()
    }

    async findAll(itemGroup: string, sortBy?:string) {
        try {
            // return await this.db.collection('products').find({'itemGroup': itemGroup.toString()}).toArray();

            if (sortBy === 'rating'){
                return await this.db.collection('products').find({'itemGroup': itemGroup.toString()}).sort({'rating':-1}).toArray();
            }
            else{
                return await this.db.collection('products').find({'itemGroup': itemGroup.toString()}).toArray();
            }
        }
        catch(err) {
            throw new NotFoundException(`Item with ${itemGroup} not found`);
        }
    }

}

