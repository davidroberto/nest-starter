import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { Order } from 'src/order/entity/order.entity';

export class CreateOrderService {
  constructor(private readonly orderRepository: Repository<Order>) {}

  async createOrder(createOrderData: CreateOrderDto): Promise<Order> {
    const order = new Order(createOrderData);

    return this.orderRepository.save(order);
  }
}
