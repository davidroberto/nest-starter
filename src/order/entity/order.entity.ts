import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { SetOrderShippingDto } from 'src/order/dto/set-order-shipping-address.dto';
import { OrderItem } from 'src/order/entity/order-item.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  static CartStatus = {
    Cart: 'Cart',
    Paid: 'Paid',
    ShippingSet: 'ShippingSet',
    InvoiceSet: 'InvoiceSet',
  };

  constructor(createOrderData?: CreateOrderDto) {
    if (createOrderData) {
      if (createOrderData.products.length > 3) {
        throw new Error("trop d'items");
      }

      this.items = this.createOrderItems(createOrderData);
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.customer = 'tetetete';
      this.paidAt = null;
      this.status = Order.CartStatus.Cart;
      this.total = 10 * createOrderData.products.length;
    }
  }

  private createOrderItems(createOrderData: CreateOrderDto): OrderItem[] {
    const orderItemsToCreate = [];

    createOrderData.products.map((product) => {
      const existingOrderItem = this.getOrderItemWithProduct(product);
      if (existingOrderItem) {
        existingOrderItem.incrementQuantity();
      } else {
        const newOrderItem = new OrderItem(product);
        orderItemsToCreate.push(newOrderItem);
      }
    });

    return orderItemsToCreate;
  }

  private getOrderItemWithProduct(product: string): OrderItem {
    return this.items.find((item) => {
      item.product === product;
    });
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  customer: string;

  @Column()
  paidAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column()
  status: string;

  @Column()
  total: number;

  @Column()
  shippingAddress: string;

  @Column()
  shippingMethod: string;

  setShipping(setOrderShippingDto: SetOrderShippingDto) {
    if (
      !setOrderShippingDto.shippingAddress ||
      !setOrderShippingDto.shippingMethod
    ) {
      throw new Error('Shipping address required');
    }

    this.shippingAddress = setOrderShippingDto.shippingAddress;
  }
}
