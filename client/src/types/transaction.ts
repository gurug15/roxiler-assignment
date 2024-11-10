
export interface Transaction {
        _id: string,
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        sold: false,
        dateOfSale: Date

}

export interface Pagi {
         total?: number,
        page?: number,
        perPage?: number,
        totalPages?: number,
        hasNextPage?: boolean
        hasPreviousPage?: boolean    
}

export interface TabelData {
    status?: string
    transactions: Transaction[],
    pagination: Pagi
}