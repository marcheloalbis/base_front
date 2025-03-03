import { Opcion } from "./opcion.model";

export interface Rol {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
    opciones: Opcion[];
    seleccionado:boolean;
}