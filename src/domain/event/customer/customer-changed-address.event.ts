import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventInterface from "../@shared/event.interface";

type EventData = {
    id: string;
    name: string
    address: Address;
};


export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: EventData
    

    constructor(eventData: EventData) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
