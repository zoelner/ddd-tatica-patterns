import RepositoryInterface from "../@shared/repository/repository-interface";
import Customer from "../customer/entity/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}