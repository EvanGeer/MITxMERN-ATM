import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Withdrawal } from "./Withdrawl";
import { MainMenu } from "./MainMenu";
import { menuButtons } from "./menuButtons";
import { TransferFunds } from "./TransferFunds";
import { Statement } from "./Statement";

const beginningBalance = 70;
function App() {
  const [currentScreen, setCurrentScreen] = React.useState(menuButtons.mainMenu);
  const [balance, setBalance] = React.useState(beginningBalance);
  const [statement, setStatement] = React.useState([{
    description:'Beginning Balance',
    amount: beginningBalance,
    total: beginningBalance}]);

  const mainMenu = menuButtons.mainMenu;

  const handleNav = (buttonClick) => {
    console.log(`handle nav: ${buttonClick}`);
    console.log(buttonClick == menuButtons.statement)
    switch(buttonClick) {
      case menuButtons.statement: 
      case menuButtons.mainMenu: 
      case menuButtons.deposit: 
      case menuButtons.withdrawal:
      case menuButtons.transfer:
      case 'Satement': 
        console.log('setting current to button name')
        setCurrentScreen(buttonClick);
        break;
      case menuButtons.quickCash80:
        handleTransfer(80, true);
      default:
        console.warn('button not mapped')
        break;

    }
  }

  const handleTransfer = (val, isWithdrawal=true) => {
    let transfer = 
      typeof(val) === 'number' ? val
      : typeof(val) === 'string' ? Number(val.replace('\$',''))
      : null;

    if (transfer === null || transfer < 0) 
    {
      console.warn(`Invalid transfer: ${val}`)
      return;
    }

    handleNav(menuButtons.mainMenu);
    if (transfer === 0) return; // no need to record +/- $0.00


    let newBalance = isWithdrawal 
      ? balance - transfer
      : balance + transfer;
    setBalance(newBalance);

    let newStatement = [...statement, {
      description: isWithdrawal ? 'Withdrawal' : 'Deposit',
      amount: val,
      total: newBalance}];
    setStatement(newStatement);
  }

  // const handleWithdrawal = (text) => {
  //   handleNav(menuButtons.mainMenu);

  //   console.log(text);
  //   let value = Number(text.replace('\$',''));
  //   console.log(value);
  //   if (!value || value <= 0) return;

  //   let newBalance = balance-value;
  //   setBalance(newBalance);
  //   let newStatement = [...statement, {
  //     description:'Withdrawal',
  //     amount: value,
  //     total: newBalance}];
  //     setStatement(newStatement);
  // }

  console.log(currentScreen);

  return (
    <>
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Welcome to React Bank
          </h1>
          <h3>Current Balance: ${balance}
          </h3>
          {
            {
              [menuButtons.deposit]:<TransferFunds onSubmit={handleTransfer} isWithdrawal={false} balance={balance}/>,
              [menuButtons.withdrawal]:<Withdrawal onSubmit={handleTransfer} balance={balance}/>,
              [menuButtons.statement]: <Statement onNav={handleNav} statement={statement}/>,
              [menuButtons.mainMenu]: <MainMenu onNav={handleNav} balance={balance}/>,
              [menuButtons.transfer]: <TransferFunds onSubmit={handleTransfer} isWithdrawal={true} balance={balance}/>,
              default: <MainMenu onNav={handleNav} balance={balance}/>,
            }[currentScreen] 
          }
          {/* <Statement onNav={handleNav} statement={statement}/> */}
        </header>
      </div>
    </>
  );
}

export default App;
