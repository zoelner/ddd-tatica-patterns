import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: Map<string, EventHandlerInterface[]> = new Map();

    getEventHandlers(eventHandler: string): EventHandlerInterface[] {
        return this.eventHandlers.get(eventHandler)
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if (this.eventHandlers.has(eventName)) {
            const handlersToNotify = this.eventHandlers.get(eventName);
            handlersToNotify.forEach(handler => handler.handle(event));
        }
    }
    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, []);
        }

        this.eventHandlers.get(eventName).push(eventHandler);

    }
    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers.has(eventName)) {
            return;
        }

        const handlers = this.eventHandlers.get(eventName);
        const filteredHandlers = handlers.filter(handler => handler !== eventHandler);

        this.eventHandlers.set(eventName, filteredHandlers);
    }
    unregisterAll(): void {
        this.eventHandlers.clear();
    }

}