export interface DeleteInterface<T> {
    delete(id: string) : Promise<boolean>;
}