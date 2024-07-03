import Address from "../value-object/address";

export default interface CustomerInterface {
    id: string;
    name: string 
    address: Address;
    rewardPoints: number 
    validate(): void;
    changeName(name: string): void;
    changeAddress(address: Address): void;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
    addRewardPoints(points: number): void;
}