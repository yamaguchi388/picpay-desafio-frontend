export class IPagamento {
    id: number;
    name: string;
    username: string;
    title: string;
    value: number;
    date: string;
    image: string;
    isPayed: boolean;
    opcoes?: ['editar', 'excluir']
}

export class IPagamentoIncluir {
    name: string;
    username: string;
    title: string;
    value: number;
    date: string;
    isPayed: boolean;
}

export class IPagamentoAlterar {
    id: number;
    name: string;
    username: string;
    title: string;
    value: number;
    date: string;
    isPayed: boolean;
}

export class IPagamentBuscar {
    name: string;
    username?: string;
    title?: string;
    value?: number;
    date?: string;
    isPayed?: boolean;
}