export interface Usuario {
    id?: number;
    name?: string;
    paterno?: string;
    materno?: string;
    email?: string;
    password?: string;
    roles: any[];
}
// export class UpdateCatDto extends PartialType( OmitType(CreateCatDto, ['name'] as const), ) {}