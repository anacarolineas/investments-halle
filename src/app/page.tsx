'use client'

import { useEffect, useState } from 'react'

export default function Home() {
    const [quote, setQuote] = useState();

    useEffect(() => {
        fetch('api/quote/teste')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setQuote(data)
            })
  }, [])

  return (
    <div>
        {JSON.stringify(quote)}
    </div>
  )
}











