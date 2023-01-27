import React from "react";
import {TransferFunds} from "./TransferFunds"

export function Withdrawal({onSubmit, balance, onGoBack}) {
    const handleSubmit = (e) => {
        let dollarAmount = e.target.textContent;
        console.log(dollarAmount);
        onSubmit(dollarAmount);
    }

    const atLeast = (val) => {
        return val >= balance ? true : '';
    }

    const isIncrementOf20 = (val) => {
      console.log(`${val} % 20 = ${val % 20}`)
      let isValid = val === undefined || val % 20 === 0;
      let validation = {
        result: isValid,
        message: `${val} is not a multiple of 20...`
      }
      console.log(validation);
      return validation;
    }

  return (
    <>
      Choose a Dollar Amount
      <div className="grid-container">
        <button
          className="col col1"
          type="toggle"
          onClick={handleSubmit}
          disabled={atLeast(20)}
        >
          $20
        </button>
        <button
          className="col col2"
          type="toggle"
          onClick={handleSubmit}
          disabled={atLeast(80)}
        >
          $80
        </button>

        <button
          className="col col1"
          type="toggle"
          onClick={handleSubmit}
          disabled={atLeast(40)}
        >
          $40
        </button>
        <button
          className="col col2"
          type="toggle"
          onClick={handleSubmit}
          disabled={atLeast(100)}
        >
          $100
        </button>

        <button
          className="col col1"
          type="toggle"
          onClick={handleSubmit}
          disabled={atLeast(60)}
        >
          $60
        </button>
        <button
          className="col col2"
          type="toggle"
          onClick={handleSubmit}
          disabled={atLeast(200)}
        >
          $200
        </button>
      </div>
      <div>Custom Amount</div>
      <small>... in multiples of $20</small>
      <TransferFunds
        customValidation={isIncrementOf20}
        onGoBack={onGoBack}
        balance={balance}
        onSubmit={onSubmit}
        isWithdrawal={true}
      />
    </>
  );
}
