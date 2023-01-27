// import { useReducer } from "react/cjs/react.production.min";
// var mainMenu = 'Deposit'
// function useSession() {
//   const [currentScreen, seturrentScreen] = React.useState('Main Menu');
//   const [balance, setBalance] = React.useState(0);
//   return [seturrentScreen, ]
// }

// import { Fragment } from "../react/cjs/react.production.min";
import { Fragment } from "../node_modules/react/cjs/react.development";
import { menuButtons } from "./menuButtons";


export function Statement({onNav, statement}) {
    
    const handleSubmit = () => {
        onNav(menuButtons.mainMenu);
    }

    return (<>
        <div className="grid-container">
            {statement.map(x => 
                <Fragment>
                    <div className="col col1"><small>{x.description}: ${x.amount}</small></div>
                    <div className="col col2">${x.total}</div>
                </Fragment>)}

        </div>
                <button className="col" onClick={handleSubmit}>Go Back</button>
                    </>
    )

}
