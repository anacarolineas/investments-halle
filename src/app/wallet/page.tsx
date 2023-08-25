'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { AssetWallet } from '../../../lib/types/asset'

const TickersContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TickersHeader = styled.div`
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    color: #6B7280;
    border-bottom: 1px solid #d3d3d3;
    padding-bottom: 10px;
    font-weight: 400;
    font-size: 0.875rem;
`;

const TickersItens = styled.div`
    max-height: 580px;
    overflow-y: scroll;
`;

export default function Page() {
    const [tabIndex, setIndexTab] = useState('');
    const [tickersData, setTickersData] = useState([] as AssetWallet[]);

    useEffect(() => {
        fetch('api/wallet')
            .then(response => response.json())
            .then((data: AssetWallet[]) => {
                console.log(data);
                setTickersData(data)
            })
    }, [])


    return (
        <section className='container px-4 mx-auto'>
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                        Ações
                    </button>

                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        FIIS
                    </button>

                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Stocks
                    </button>
                </div>
            </div>
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="h-96 overflow-y-scroll border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <span>Ativo</span>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <span>Preço Atual</span>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Preço Médio
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Posição
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-y-scroll">
                                    {
                                        tickersData.map((ticker: AssetWallet, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white ">{ticker.ticker}</h2>
                                                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{ticker.longName}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <p className='text-gray-700 dark:text-gray-200'>R${ticker.marketPrice}</p>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <h4 className="text-gray-700 dark:text-gray-200">R${ticker.avaragePrice}</h4>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div>
                                                            <h4 className="text-gray-700 dark:text-gray-200">R${ticker.rentability} | {ticker.amount}</h4>
                                                            {
                                                                ticker.rentabilityPercent < 0 ?
                                                                <p className="text-red-600 dark:text-gray-500">{ticker.rentabilityPercent}%</p> :
                                                                <p className="text-lime-500 dark:text-gray-500">{ticker.rentabilityPercent}%</p>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

