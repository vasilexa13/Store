import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getDb } from "../database/db";
import { ObjectId } from "mongodb";

@Injectable()
export class CartService {
    private db: any;

    constructor() {
        this.db = getDb();
    }

    async writeCartData(_idUser: string, items: { _idItem: string; shopData: string; itemQuantity: number }[]): Promise<void> {
        const dataUser = await this.db.collection('users').findOne({ _id: new ObjectId(_idUser) });
        if (!dataUser) {
            throw new NotFoundException(`User not found`);
        }

        // массив для хранения всех товаров в корзине
        let cartItems = [];

        // общий totalPrice для всех товаров
        let totalPrice = 0;

        for (const item of items) {
            const dataItem = await this.db.collection('products').findOne({ _id: new ObjectId(item._idItem) });
            if (!dataItem) {
                throw new NotFoundException(`Item with id ${item._idItem} not found`);
            }

            const itemData = await this.db.collection('products').aggregate([
                {
                    $match: { _id: new ObjectId(item._idItem) }
                },
                {
                    $unwind: "$shops"
                },
                {
                    $match: { "shops.shopTitle": item.shopData }
                },
                {
                    $project: {
                        _id: 1,
                        itemGroup: 1,
                        title: 1,
                        shop: "$shops.shopTitle",
                        quantity: item.itemQuantity,
                        price: "$shops.price",
                        totalItemPrice: { $multiply: [item.itemQuantity, "$shops.price"] },
                    },
                }
            ]).toArray();


            ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (itemData.length > 0) {
                cartItems.push(itemData[0]);
                totalPrice += itemData[0].totalItemPrice;
            }
        }

        const cartDocument = {
            user: {
                _id: dataUser._id,
                email: dataUser.email,
                userName: dataUser.userName
            },
            items: cartItems,
            totalPrice: totalPrice
        };
        await this.db.collection('cart').insertOne(cartDocument);
    }

    async allCartData() {
        const cartData = await this.db.collection('cart').find().toArray();
        return cartData;
    }
}