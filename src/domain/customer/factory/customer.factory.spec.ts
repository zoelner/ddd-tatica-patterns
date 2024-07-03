import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    })

    it("should create a customer with an address", () => {
        const address = new Address("123 Main St", 123, "12345", "Springfield");
        const customer = CustomerFactory.createWIthAddress("John Doe", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John Doe");
        expect(customer.address.street).toBe("123 Main St");
        expect(customer.address.number).toBe(123);
        expect(customer.address.zip).toBe("12345");
        expect(customer.address.city).toBe("Springfield");
        expect(customer.constructor.name).toBe("Customer");
    })
})
