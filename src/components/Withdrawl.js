import React from "react";

export function Withdrawal({onSubmit, balance, onGoBack}) {
    const handleSubmit = (e) => {
        let dollarAmount = e.target.textContent;
        console.log(dollarAmount);
        onSubmit(dollarAmount);
    }

    const atLeast = (val) => {
        return val >= balance ? true : '';
    }

  return (
    <>
      Choose a Dollar Amount
      <small>... in multiples of $20</small>
      <div className="grid-container">
        <button className="col col1" type="toggle" onClick={handleSubmit} disabled={atLeast(20)}>
          $20
        </button>
        <button className="col col2" type="toggle" onClick={handleSubmit} disabled={atLeast(80)}>
          $80
        </button>

        <button className="col col1" type="toggle" onClick={handleSubmit} disabled={atLeast(40)}>
          $40
        </button>
        <button className="col col2" type="toggle" onClick={handleSubmit} disabled={atLeast(100)}>
          $100
        </button>

        <button className="col col1" type="toggle" onClick={handleSubmit} disabled={atLeast(60)}>
          $60
        </button>
        <button className="col col2" type="toggle" onClick={handleSubmit} disabled={atLeast(200)}>
          $200
        </button>
      </div>
      <button className="col" onClick={onGoBack}>Go Back</button>
    </>);
}