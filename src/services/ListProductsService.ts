interface IProducts {
    id: number;
    name: string;
    price: number;
}

class ListProductsService {
    public execute(): IProducts[ ] {
        const products =  [
            { id: 1, name: 'Notebook Gamer', price: 4300 },
            { id: 2, name: 'MacBook Air 5', price: 8900 },
            { id: 3, name: 'PlayStation 5', price: 3200 },
        ]
        return products
    }
}

export default ListProductsService