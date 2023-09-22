import { TableRow, TableCell, Checkbox} from '@mui/material';

export class Item {
    
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
      }
}

interface Props {
    item: Item;
    isSelected: boolean;
    onSelectItem: (itemId: number) => void;
}

export const ShoppingItem = ({ item, isSelected, onSelectItem }: Props) => {
    
    return (
    <TableRow key={item.id} hover selected={isSelected}>
        <TableCell padding="checkbox">
        <Checkbox checked={isSelected} onChange={() => onSelectItem(item.id)} />
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>{item.name}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{item.price}</TableCell>
    </TableRow>
    );

};

