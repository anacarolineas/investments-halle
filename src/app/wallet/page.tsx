'use client'

import CardTicker from '@/components/wallet/cardTicker';
import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react'
import styled from 'styled-components';

export default function Page() {
    const [tickersData, setTickersData] = useState([]);

    useEffect(() => {
        fetch('api/quote/teste')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTickersData(data)
            })
  }, [])

  const [value, setValue] = useState('one');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const TickersContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <div>
        <Tabs 
            value={value} 
            onChange={handleChange}
            centered>
            <Tab value="1" label="Ações" />
            <Tab value="2" label="FII's" />
            <Tab value="3" label="Stocks" />
            <Tab value="4" label="Reits" />
            <Tab value="5" label="ETF's" />
        </Tabs>
        <br></br>
        <TickersContainer>
            {tickersData.map(ticker => (
                <CardTicker key={ticker} ticker={ticker}></CardTicker>
            ))}
        </TickersContainer>           
    </div>
  )
}











