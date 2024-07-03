import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize.transaction()
        try {
            await OrderModel.update({
                customer_id: entity.customerId,
                total: entity.total()
            }, {
                where: { id: entity.id },
                transaction
            })

            await OrderItemModel.destroy({
                where: {
                    order_id: entity.id
                },
                transaction
            })

            await OrderItemModel.bulkCreate(entity.items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                    order_id: entity.id
                }
            }), {
                transaction
            })

            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw new Error("Error updating order")
        }
    }


    async find(id: string): Promise<Order> {
        let orderModel
        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id
                },
                include: ["items"],
                rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("Order not found")
        }

        const order = new Order(id, orderModel.customer_id, orderModel.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        }))

        return order



    }
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        })


        return orderModels.map((orderModel) => {
            return new Order(orderModel.id, orderModel.customer_id, orderModel.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
            }))
        })
    }
}