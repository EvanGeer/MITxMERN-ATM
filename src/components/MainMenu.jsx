import React from "react";

export const menuButtons = {
  mainMenu: 'Main Menu',
  withdrawal: 'Cash Withdrawal',
  deposit: 'Deposit',
  quickCash80: 'Quick Cash $80',
  statement: 'Statement',
  transfer: 'Transfer Out',
};

export function MainMenu({onNav, balance}) {
    const handleClick = (e) => {

        let nav = e.target.textContent;
        console.log(nav);
        onNav(nav);
    }

    const atLeast = (val) => {
        return val >= balance ? true : '';
    }

  return (
    <>
      Choose a Transaction
      <div className="grid-container">
        <button className="col col1" type="toggle" onClick={handleClick}>
          {menuButtons.deposit}
        </button>

        <button className="col col2" type="toggle" onClick={handleClick}  disabled={atLeast(80)}>
          {menuButtons.quickCash80}
        </button>
        <div className="col1">&nbsp;</div>

        <button className="col col2" type="toggle" onClick={handleClick}>
          {menuButtons.withdrawal}
        </button>
        <button className="col col1" type="toggle" onClick={handleClick}>
          {menuButtons.statement}
        </button>        
        <button className="col col2" type="toggle" onClick={handleClick}>
          {menuButtons.transfer}
        </button>
      </div>
    </>
  );

}
