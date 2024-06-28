class Customer {
    private _id: string;
    private _name: string;
    private _address: string;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }
    
}