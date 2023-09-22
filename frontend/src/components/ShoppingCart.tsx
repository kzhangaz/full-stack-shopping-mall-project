import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Box, IconButton, Badge, BadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect, useContext } from "react";
import { Item } from './ShoppingItem'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { SelectContext } from '../App'

interface Props {
    totalItem: number;
    totalPrice: number;
}

interface SelectContextType {
    selectedItems: Item[]; 
    setSelectedItems: (item: Item) => {}; 
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const ShoppingCart = () => {

    const { selectedItems, setSelectedItems } = useContext(SelectContext) as SelectContextType;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    let totalItem: number = selectedItems.length;
    let totalPrice: number = 0;

    totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
    totalPrice = Number(totalPrice.toFixed(2));
    
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: "center",
                position: 'fixed',
                bottom: '0',
                width: '100%',
                paddingBottom: '10px',
                background: '#f5f5f5',
                padding: '16px'
            }}
            onClick={openModal}
        >
        <Box display="flex" alignItems="center">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={totalItem} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <h4 style={{ marginLeft: '20px', fontWeight: 'bold' }}>Shopping Cart</h4>
        <p style={{ marginLeft: '10px' }}> ( click to see details ) </p>
        <h3 style={{ marginLeft: '650px' }}>Total Price:</h3>
        <p style={{ margin: 5 }}>{totalPrice}</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}> $</p>
        </Box>
        <Dialog 
            id='dialog'
            open={isModalOpen} 
            onClose={closeModal}
            BackdropProps={{
                onClick: closeModal,
              }}
            disablebackdropclick="true"
            display={isModalOpen ? 'flex' : 'none'}
        >
        <DialogTitle>Check Items</DialogTitle>
        <DialogContent style={{width: '500px',display: 'flex', justifyContent: 'center'}}>
            <Table>
                <TableHead style={{ background: '#E6F2F8' }}>
                    <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>Shopped Items</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Prices</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedItems && selectedItems.length > 0 ? (
                        selectedItems.map((item: Item) => (
                        <TableRow key={item.id}>
                            <TableCell style={{ textAlign: 'center' }}>{item.name}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{item.price}</TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                            No selected items
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Press Esc to close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default ShoppingCart;