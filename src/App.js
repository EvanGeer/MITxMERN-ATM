import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { currency } from './currencySettings'

// components
import { Withdrawal } from "./components/Withdrawl";
import { MainMenu, menuButtons } from "./components/MainMenu";
import { Statement } from "./components/Statement";
import { TransferFunds } from "./components/TransferFunds";



function App() {
  const beginningBalance = 
    Number(localStorage.getItem('balance')) ?? 
    70;
  const beginningStatement = 
  JSON.parse(localStorage.getItem('statement')) || 
  [{
    description:'Beginning Balance',
    amount: beginningBalance,
    total: beginningBalance}];
    
  const [currentScreen, setCurrentScreen] = React.useState(menuButtons.mainMenu);
  const [balance, setBalance] = React.useState(beginningBalance);
  const [statement, setStatement] = React.useState(beginningStatement);


  const goBack = () => handleNav(menuButtons.mainMenu);
  const handleNav = (buttonClick) => {
    console.log(`handle nav: ${buttonClick}`);

    switch(buttonClick) {
      case menuButtons.statement: 
      case menuButtons.mainMenu: 
      case menuButtons.deposit: 
      case menuButtons.withdrawal:
      case menuButtons.transfer:
      case 'Satement': 
        console.log(`setting current to ${buttonClick}`)
        return setCurrentScreen(buttonClick);
      
      case menuButtons.quickCash80:
        console.log(`handle quick cash: ${buttonClick}`)
        return handleTransfer(80, true);
      
      default:
        console.warn('button not mapped')
        break;
    }
  }

  const handleTransfer = (val, isWithdrawal=true) => {
    console.log(`Is Withdrawal: ${isWithdrawal}, ${val}`)
    let transfer = 
      typeof(val) === 'number' ? Number(val)
      : typeof(val) === 'string' ? Number(val.replace('$',''))
      : null;

    console.log(`Parsed Transfer: ${transfer}`)

    if (transfer === null || transfer < 0) 
    {
      console.warn(`Invalid transfer: ${val}`)
      return;
    }

    handleNav(menuButtons.mainMenu);
    if (transfer === 0) return; // no need to record +/- $0.00

    // update balance
    let newBalance = isWithdrawal 
      ? balance - transfer
      : balance + transfer;
    setBalance(newBalance);
    localStorage.setItem('balance',newBalance);

    // update statement
    let newStatement = [...statement, {
      description: isWithdrawal ? 'Withdrawal' : 'Deposit',
      amount: transfer,
      total: newBalance}];
    setStatement(newStatement);
    let json = JSON.stringify(newStatement);
    localStorage.setItem('statement',json);
  }

  console.log(currentScreen);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to React Bank</h1>
          <h3>Current Balance: {currency.format(balance)}</h3>
          {
            // swap out components per navigation
            {
              [menuButtons.deposit]: (
                <TransferFunds
                  onSubmit={handleTransfer}
                  onGoBack={goBack}
                  isWithdrawal={false}
                  balance={balance}
                />
              ),

              [menuButtons.withdrawal]: (
                <Withdrawal
                  onSubmit={handleTransfer}
                  onGoBack={goBack}
                  balance={balance}
                />
              ),

              [menuButtons.statement]: (
                <Statement onGoBack={goBack} statement={statement} />
              ),

              [menuButtons.mainMenu]: (
                <MainMenu onNav={handleNav} balance={balance} />
              ),

              [menuButtons.transfer]: (
                <TransferFunds
                  onSubmit={handleTransfer}
                  onGoBack={goBack}
                  isWithdrawal={true}
                  balance={balance}
                />
              ),

              default: <MainMenu onNav={handleNav} balance={balance} />,
            }[currentScreen]
          }
        </header>
      </div>
    </>
  );
}

export default App;
