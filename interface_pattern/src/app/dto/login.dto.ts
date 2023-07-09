export interface LoginDto {
    readonly token: string
}

export interface LoginRequestDto {
    readonly email: string
    readonly password: string
}