import EventInterface from "../../@shared/event/event.interface";
import Address from "../../customer/value-object/address";

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
