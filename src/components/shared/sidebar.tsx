'use client'
import Link from "next/link";
import { styled } from "styled-components";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0d0c0c;
    padding: 20px;
    gap: 20px;
`;

export default function Sidebar() {
    return (
        <Aside>
          <Link href="/wallet">
            <WalletOutlinedIcon sx={{ color: "white" }} ></WalletOutlinedIcon>
          </Link>
          <Link href="/dividends">
           <PaymentsOutlinedIcon sx={{ color: "white" }}></PaymentsOutlinedIcon>
          </Link>
          <Link href="/dividends">
            <AccountBalanceOutlinedIcon sx={{ color: "white" }}></AccountBalanceOutlinedIcon>
          </Link>
          <Link href="/wallet">
            <FileUploadOutlinedIcon sx={{ color: "white" }}></FileUploadOutlinedIcon>
          </Link>
          <Link href="/wallet">
            <SettingsOutlinedIcon sx={{ color: "white" }}></SettingsOutlinedIcon>
          </Link>
        </Aside>
    );
}