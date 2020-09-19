import { CreateInterface } from "./CreateInterface";
import { DeleteInterface } from "./deleteInterface";
import { ReadInterface } from "./ReadInterface";
import { UpdateInterface } from "./UpdateInterface";

export interface AbsRepository<T> extends CreateInterface<T>, ReadInterface<T>, UpdateInterface<T>, DeleteInterface<T>{


}