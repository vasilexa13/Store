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
            if (sortBy === 'rating'){
                return await this.db.collection('products').find({'itemGroup': itemGroup.toString()}).sort({'rating':-1}).toArray();
            }
            else if (sortBy === 'cheap'){
                const products = await this.db.collection('products').aggregate([
                    {
                        $unwind: "$shops"
                    },
                    {
                        $group: {
                            _id: "$_id",
                            itemGroup: { $first: "$itemGroup" },
                            rating: { $first: "$rating" },
                            title: { $first: "$title" },
                            properties: {
                                $first: {
                                    color: "$properties.color",
                                    size: "$properties.size"
                                }
                            },
                            minPrice: { $min: "$shops.price" },
                            shops: { $push: "$shops" }
                        }
                    },
                    { $sort: { minPrice: 1 } }
                ]).toArray();
                return products
            }
            else if (sortBy ==='expensive'){
                const products = await this.db.collection('products').aggregate([
                    {
                        $unwind: "$shops"
                    },
                    {
                        $group: {
                            _id: "$_id",
                            itemGroup: { $first: "$itemGroup" },
                            rating: { $first: "$rating" },
                            title: { $first: "$title" },
                            properties: {
                                $first: {
                                    color: "$properties.color",
                                    size: "$properties.size"
                                }
                            },
                            minPrice: { $min: "$shops.price" },
                            shops: { $push: "$shops" }
                        }
                    },
                    { $sort: { minPrice: -1 } }
                ]).toArray();
                return products
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

