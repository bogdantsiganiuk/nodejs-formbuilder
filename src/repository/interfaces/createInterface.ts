export interface CreateInterface<T> {
    create(item: T) : Promise<boolean>;
}