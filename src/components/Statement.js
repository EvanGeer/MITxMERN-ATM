import { Fragment } from "../../node_modules/react/cjs/react.development";

export function Statement({onGoBack, statement}) {
    
    const handleSubmit = () => {
        onGoBack();
    }

    const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' });

    return (<>
        <div className="grid-container">
            {statement.map(x => 
                <Fragment>
                    <div className="col col1"><small>{x.description}: {currency.format(x.amount)}</small></div>
                    <div className="col col2">{currency.format(x.total)}</div>
                </Fragment>)}

        </div>
                <button className="col" onClick={handleSubmit}>Go Back</button>
                    </>
    )

}
