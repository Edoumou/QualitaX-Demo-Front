import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { Menu, MenuItem, Image, Button, Icon, Segment, Table, TableHeader, TableHeaderCell, TableRow, TableCell, TableBody } from 'semantic-ui-react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { web3Connection } from './utils/web3Connection';
import { getContract } from './utils/getContract';
import FormateAddress from './utils/FormateAddress';
import Formate from './utils/Formate';
import { getABI } from './utils/getABI';
import { getAddress } from './utils/getAddress';
import "./App.css";

function App() {
  const [lido, setLido] = useState([]); 
  const [stkr, setStkr] = useState([]); 
  const [styeth, setStyETH] = useState([]);
  const [payerLIDOAmount, setPayerLIDOAmount] = useState(0);
  const [payerSTKRAmount, setPayerSTKRAmount] = useState(0);
  const [payerSTYETHAmount, setPayerSTYETHAmount] = useState(0);
  const [receiverLIDOAmount, setReceiverLIDOAmount] = useState(0);
  const [receiverSTKRAmount, setReceiverSTKRAmount] = useState(0);
  const [receiverSTYETHAmount, setReceiverSTYETHAmount] = useState(0);
  const [payerTotAmount, setPayerTotAmount] = useState(0);
  const [receiverTotAmount, setReceiverTotAmount] = useState(0);

  const storeContracts = useCallback(async () => {
    let {lidoAddress, stkrAddress, styethAddress} = getAddress();
    let { lidoABI, stkrABI, styethABI } = getABI();
    let { web3, account } = await web3Connection();

    let lidoContract = await getContract(web3, lidoABI, lidoAddress);
    let stkrContract = await getContract(web3, stkrABI, stkrAddress);
    let styethContract = await getContract(web3, styethABI, styethAddress);

    let lidoReceipt = await lidoContract.methods.getIRSReceipts().call({ from: account });
    let stkrReceipt = await stkrContract.methods.getIRSReceipts().call({ from: account });
    let styETHReceipt = await styethContract.methods.getIRSReceipts().call({ from: account });

    setLido(lidoReceipt);
    setStkr(stkrReceipt);
    setStyETH(styETHReceipt);

    let payer = "0x2aB0021165ed140EC25Bc320956963CA2d3dbca0";
    let receiver = "0xA2003BF3fEbB0E8DcdEA3c75F1699b5c443Cc7cc";

    let payerSUM = 0;
    let receiverSUM = 0;

    lidoReceipt.map((item, index) => {
      if(item.from === payer) {
        payerSUM += Number(item.netAmount);
      } else {
        receiverSUM += Number(item.netAmount);
      }
    });

    setPayerLIDOAmount(payerSUM);
    setReceiverLIDOAmount(receiverSUM);

    payerSUM = 0;
    receiverSUM = 0;

    stkrReceipt.map((item, index) => {
      if(item.from === payer) {
        payerSUM += Number(item.netAmount);
      } else {
        receiverSUM += Number(item.netAmount);
      }
    });

    setPayerSTKRAmount(payerSUM);
    setReceiverSTKRAmount(receiverSUM);

    payerSUM = 0;
    receiverSUM = 0;

    styETHReceipt.map((item, index) => {
      if(item.from === payer) {
        payerSUM += Number(item.netAmount);
      } else {
        receiverSUM += Number(item.netAmount);
      }
    });

    setPayerSTYETHAmount(payerSUM);
    setReceiverSTYETHAmount(receiverSUM);

    console.log('Lido Tot Amount:', receiverSUM / 1e18);
  });

  useEffect(() => {
    storeContracts();
  }, []);

  const renderedLIDO = lido.map((item, index) => {
    return(
      <TableRow key={index}>
        <TableCell textAlign="left">{(new Date(item.timestamp * 1000)).toLocaleDateString()}</TableCell>
        <TableCell>{FormateAddress(item.from)}</TableCell>
        <TableCell>{FormateAddress(item.to)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.netAmount / 1e18)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.fixedRatePayment / 1e18)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.floatingRatePayment / 1e18)}</TableCell>
      </TableRow>
    );
  });

  const renderedSTKR = stkr.map((item, index) => {
    return(
      <TableRow key={index}>
        <TableCell textAlign="left">{(new Date(item.timestamp * 1000)).toLocaleDateString()}</TableCell>
        <TableCell>{FormateAddress(item.from)}</TableCell>
        <TableCell>{FormateAddress(item.to)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.netAmount / 1e18)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.fixedRatePayment / 1e18)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.floatingRatePayment / 1e18)}</TableCell>
      </TableRow>
    );
  });

  const renderedSTYETH = styeth.map((item, index) => {
    return(
      <TableRow key={index}>
        <TableCell textAlign="left">{(new Date(item.timestamp * 1000)).toLocaleDateString()}</TableCell>
        <TableCell>{FormateAddress(item.from)}</TableCell>
        <TableCell>{FormateAddress(item.to)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.netAmount / 1e18)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.fixedRatePayment / 1e18)}</TableCell>
        <TableCell textAlign='right'>{Formate(item.floatingRatePayment / 1e18)}</TableCell>
      </TableRow>
    );
  });

  return (
    <div className='App'>
      <div className='container'>
        <div className='head'>IRS Swap outcome - LIDO</div>
        <div className='show-table'>
          <Table padded selectable inverted>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Net Payer</TableHeaderCell>
                <TableHeaderCell>Net Recipient</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Amount - USDC</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Fixed Amount - USDC</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Floating Amount - USDC</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderedLIDO}
            </TableBody>
          </Table>
        </div>
          
      </div>
      <div className='container'>
        <div className='head'>IRS Swap outcome - STKR</div>
        <div className='show-table'>
          <Table padded selectable inverted>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Net Payer</TableHeaderCell>
                <TableHeaderCell>Net Recipient</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Amount - USDC</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Fixed Amount - USDC</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Floating Amount - USDC</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderedSTKR}
            </TableBody>
          </Table>
        </div>
        
      </div>
      <div className='container'>
        <div className='head'>IRS Swap outcome - STYETH</div>
        <div className='show-table'>
          <Table padded selectable inverted>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Net Payer</TableHeaderCell>
                <TableHeaderCell>Net Recipient</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Amount - USDC</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Fixed Amount - USDC</TableHeaderCell>
                <TableHeaderCell textAlign='right'>Net Floating Amount - USDC</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderedSTYETH}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='container'>
        <div className='show-table'>
          <Table padded selectable inverted>
            <TableHeader>
              <TableRow>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell textAlign="right">LIDO total Payment - USDC</TableHeaderCell>
                <TableHeaderCell textAlign="right">STKR total Payment - USDC</TableHeaderCell>
                <TableHeaderCell textAlign="right">STYETH total Payment - USDC</TableHeaderCell>
                <TableHeaderCell textAlign="right">Total Payment - USDC</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Payer</TableCell>
                <TableCell textAlign="right">{Formate(payerLIDOAmount / 1e18)}</TableCell>
                <TableCell textAlign="right">{Formate(payerSTKRAmount / 1e18)}</TableCell>
                <TableCell textAlign="right">{Formate(payerSTYETHAmount / 1e18)}</TableCell>
                <TableCell textAlign="right">{Formate(payerLIDOAmount / 1e18 + payerSTKRAmount / 1e18 + payerSTYETHAmount / 1e18)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Receiver</TableCell>
                <TableCell textAlign="right">{Formate(receiverLIDOAmount / 1e18)}</TableCell>
                <TableCell textAlign="right">{Formate(receiverSTKRAmount / 1e18)}</TableCell>
                <TableCell textAlign="right">{Formate(receiverSTYETHAmount / 1e18)}</TableCell>
                <TableCell textAlign="right">{Formate(receiverLIDOAmount / 1e18 + receiverSTKRAmount / 1e18 + receiverSTYETHAmount / 1e18)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default App;