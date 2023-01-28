import React from "react";

export function TransferFunds({onSubmit, isWithdrawal, balance, onGoBack, customValidation}) {
  const [value, setValue] = React.useState('');
  const [isOverdraft, setIsOverdraft] = React.useState();
  const [isNegativeInput, setIsNegativeInput] = React.useState();
  const [isValid, setIsValid] = React.useState();
  const [isCustomFailure, setIsCustomFailure] = React.useState();
  const [customValidationMessage, setCustomValidationMessage] = React.useState();

  React.useEffect(() => {
    // updates validation after render 
    // so that state is accurately reflected
    let overdraft = isWithdrawal && balance - value < 0;
    setIsOverdraft(overdraft);

    let negative = value < 0;
    setIsNegativeInput(negative);

    let custom = customValidation 
      ? customValidation(value) 
      : null;
      console.log(custom);
    setIsCustomFailure(!custom?.result ?? false);
    setCustomValidationMessage(custom?.message);

    console.log(`Calculate is valid - overdraft: ${overdraft}`)
    console.log(`Calculate is valid - negative: ${negative}`)
    console.log(`Calculate is valid - additional: ${custom}`)
    let valid = !value 
      || (!overdraft && !negative && !custom);
    setIsValid(valid)
  }, [value, balance, customValidation, isWithdrawal]);

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
      <div className="grid-container">
        <input
          className={`t-entry${isValid ? "" : " invalid"}`}
          type="number"
          placeholder="0.00"
          value={value}
          onChange={handleChange}
          onKeyDown={submitOnEnterKey}
          />
      </div>
      {isNegativeInput ? <div className="error">Value cannot be negative</div>: null}
      {isOverdraft ? <div className="error">Insufficient funds</div> : null}
      {isCustomFailure ? <div className="error">{customValidationMessage}</div> : null}
      {isValid ? <br/> : null}
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
