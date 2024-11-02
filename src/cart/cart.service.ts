import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {getDb} from "../database/db";
import {ObjectId} from "mongodb";

@Injectable()
export class CartService {
    private db: any;
    constructor() {
        this.db = getDb();
    }

    async writeCartData(_idUser, _idItem , shopData, itemQuantity): Promise<void> {
        const dataUser = await this.db.collection('users').findOne({_id : new ObjectId(_idUser)});
        const dataItem =await this.db.collection('products').findOne({_id : new ObjectId(_idItem)});
        if (dataUser && dataItem){
            const user = await this.db.collection('users').aggregate([
                {
                    $match: {_id: new ObjectId(_idUser)}
                },
                {
                    $project:{
                        _id: 1,
                        email:1,
                        userName:1
                    }
                }
            ]).toArray();

            const item = await this.db.collection('products').aggregate([
                {
                    $match: {_id: new ObjectId(_idItem)}
                },
                {
                    $unwind: "$shops"
                },
                {
                    $match: {"shops.shopTitle": shopData}
        },
                {
                    $project:{
                        _id: 1,
                        itemGroup:1,
                        title:1,
                        shop:"$shops.shopTitle",
                        price: "$shops.price",
                        totalPrice:{ $multiply: [ +itemQuantity, "$shops.price" ] }
                    },

                }

            ]).toArray();
            const cartData  =await this.db.collection('cart').insertOne({user , item});

            return cartData
        }else {
            throw new NotFoundException(`User not found , or cart is empty`);
        }
    }

    async allCartData() {
        const cartData = await this.db.collection('cart').find().toArray();
        return cartData
    }
}
