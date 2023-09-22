import logo from './logo.svg';
import { useState, useEffect, createContext } from "react";
import './App.css';
import {Box,Button} from '@mui/material';
import ShoppingList from './components/ShoppingList.tsx';
import ShoppingCart from './components/ShoppingCart.tsx';
import { Item } from "./components/ShoppingItem.tsx";
import axios from "axios";

export const SelectContext = createContext({
  selectedItems: [],
  setSelectedItems: ()=>{}
});

function App() {

  const [selectedItems, setSelectedItems] = useState([]);
  const select = { selectedItems, setSelectedItems };

  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/items');
      const mappedData = response.data.map((json) => new Item(json.id, json.name, json.price));
      setData(mappedData);
      // console.log(mappedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <SelectContext.Provider value={select}>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Welcom to the online shopping mall !
        {/* <Button onClick={console.log(data)}>Button</Button> */}
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box width='80%' height='350px' overflow='auto' border='1px solid black' borderRadius='8px' p={2}>
          <ShoppingList
            data={data}
          />
        </Box>
      </div>
      <ShoppingCart />
      </SelectContext.Provider>
    </div>
  );
}

export default App;
