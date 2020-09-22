export interface ReadInterface<T> {
    readAll() : Promise<T[]>;
    readOne(item: T) : Promise<T>;
    findAll(item: T) : Promise<T[]>;
}