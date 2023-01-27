import React from "react";

export function TransferFunds({onSubmit, isWithdrawal, balance, onGoBack}) {
  const [value, setValue] = React.useState();
  const [isOverdraft, setIsOverdraft] = React.useState();
  const [isNegativeInput, setIsNegativeInput] = React.useState();
  const [isValid, setIsValid] = React.useState();

  React.useEffect(() => {
    setIsOverdraft(isWithdrawal && balance - value < 0);
    setIsNegativeInput(value < 0);
  }, [value]);

  React.useEffect(
    () => setIsValid(!isOverdraft && !isNegativeInput),
    [isNegativeInput, isOverdraft]
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };


  const submitOnEnterKey = (e) => {
    if(e.which !== 13) return;
    handleSubmit();
  }

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(value, isWithdrawal);
  };

  return (
    <>
      <input
        className={`t-entry${isValid ? "" : " invalid"}`}
        type="number"
        placeholder="0.00"
        value={value}
        onChange={handleChange}
        onKeyDown={submitOnEnterKey}
      />
      {isNegativeInput ? (
        <div class="error">Value cannot be negative</div>
      ) : null}
      {isOverdraft ? <div class="error">Insufficient funds</div> : null}
      <div className="grid-container">
        <button className="col col1" type="toggle" onClick={onGoBack}>
          Go Back
        </button>
        <button
          className="col col2"
          type="toggle"
          onClick={handleSubmit}
          disabled={isValid ? "" : 1}
        >
          Okay
        </button>
      </div>
    </>
  );
}
