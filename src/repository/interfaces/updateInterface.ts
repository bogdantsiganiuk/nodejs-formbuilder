export interface UpdateInterface<T> {
    update(id: string) : Promise<boolean>;
}