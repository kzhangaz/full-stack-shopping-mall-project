import { useState, useEffect, useContext, createContext } from "react";
import { Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from '@mui/material';
import { Item, ShoppingItem } from "./ShoppingItem.tsx";
import { SelectContext } from '../App'
// export const SelectedItemsContext = createContext<Item[]>([]);

// export const data: Item[] = [
//     { id: 1, name: 'Item 1' , price: 11.4},
//     { id: 2, name: 'Item 2' , price: 2},
//     { id: 3, name: 'Item 3' , price: 3},
//     { id: 4, name: 'Item 4' , price: 3},
//     { id: 5, name: 'Item 5' , price: 3013.9}
// ];

interface SelectContextType {
    selectedItems: Item[]; 
    setSelectedItems: (item: Item) => {}; 
}

const ShoppingList = ( data : Item[]) => {

    // console.log(data)
    console.log(data.data.length)

    const { selectedItems, setSelectedItems } = useContext(SelectContext) as SelectContextType;

    const isSelected = (itemId: number) => selectedItems.some(item => item.id === itemId);

    const handleSelectItem = (itemId: number) => {
        if (isSelected(itemId)) {
            setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
        } else {
            setSelectedItems([...selectedItems, (data.data).find(item => item.id === itemId)]);
        }
    };

    return (
        <Table>
          <TableHead style={{ background: '#E6F2F8' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < (data.data).length}
                  checked={selectedItems.length === (data.data).length}
                  onChange={() =>
                    selectedItems.length === (data.data).length
                      ? setSelectedItems([])
                      : setSelectedItems(data.data)
                  }
                />
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>All Items</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Prices</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.length > 0 ? (
                (data.data).map((item) => (
                <ShoppingItem
                    key={item.id}
                    item={item}
                    isSelected={isSelected(item.id)}
                    onSelectItem={handleSelectItem}
                />
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                    {data.length === 0 ? 'Loading' : 'No items available'}
                </TableCell>
                </TableRow>
            )}
            {data[0]}
          </TableBody>
        </Table>
      );
};

export default ShoppingList;