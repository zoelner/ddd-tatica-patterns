import Address from "../../entity/address";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Customer unit events tests", () => {

    it("should test customer created event", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                city: "City 1",
                zipCode: "12345",
                state: "State 1",
                country: "Country 1"
            },
            active: true,
            rewardPoints: 0,

        })

        // Act
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        eventDispatcher.notify(customerCreatedEvent);
        // Assert
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")).toBeDefined()
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent").length).toBe(2)
        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
        expect(spyEventHandler1).toHaveBeenCalledWith(customerCreatedEvent)
        expect(spyEventHandler2).toHaveBeenCalledWith(customerCreatedEvent)


    })

    it("should test customer changed address event", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const customerCreatedEvent = new CustomerChangedAddressEvent({
            id: "1",
            name: "Customer 1",
            address: new Address("Street 1", 1, "12345", "City 1"),
        })

        // Act
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        eventDispatcher.notify(customerCreatedEvent);
        // Assert
        expect(eventDispatcher.getEventHandlers("CustomerChangedAddressEvent")).toBeDefined()
        expect(eventDispatcher.getEventHandlers("CustomerChangedAddressEvent").length).toBe(1)
        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler).toHaveBeenCalledWith(customerCreatedEvent)
    })


})