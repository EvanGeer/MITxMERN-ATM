import { Fragment } from "../../node_modules/react/cjs/react.development";
import { currency } from "../currencySettings";

export function Statement({onGoBack, statement}) {
  const handleSubmit = () => {
    onGoBack();
  };

  return (
    <>
      <div className="grid-container">
        {statement.map((x, i) => (
          <Fragment key={i.toString()}>
            <div className="col col1">
              <small>
                {x.description}: {currency.format(x.amount)}
              </small>
            </div>
            <div className="col col2">{currency.format(x.total)}</div>
          </Fragment>
        ))}
      </div>
      <button className="col" onClick={handleSubmit}>
        Go Back
      </button>
    </>
  );
}
