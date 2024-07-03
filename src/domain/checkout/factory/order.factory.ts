import Order from "../entity/order";
import OrderInterface from "../entity/order.interface";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: Array<{
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }>;
}

export default class OrderFactory {
    static create(orderProps: OrderFactoryProps): OrderInterface {
        const items = orderProps.items.map((item) => new OrderItem(item.id, item.name,  item.price, item.productId, item.quantity));
        const order = new Order(orderProps.id, orderProps.customerId, items);

        return order;
    }
}