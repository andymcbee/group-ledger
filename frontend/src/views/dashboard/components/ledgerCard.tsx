import { Card } from "../../../components/card/card";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LinkButtonMain } from "../../../components/button/linkButtonMain/linkButtonMain";
import { styles } from "../../../styles";
import { convertCentsToDollars } from "../../../utils/convertCentsToDollars";
import { useState } from "react";

export function LedgerCard(props) {
  const editLedgerPath = "/ledger/123";

  const total_cents = props.ledger.total_amount_cents;
  console.log("total cents:::");
  console.log(total_cents);

  const dollarAmount = convertCentsToDollars(total_cents);

  //const dollarColor = "text-gray-600";

  let dollarColor;

  if (total_cents < 0) {
    dollarColor = "text-red-600";
  } else if (total_cents == 0) {
    dollarColor = "text-gray-600";
  } else {
    dollarColor = "text-green-600";
  }

  return (
    <Card>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <Link to={`/ledger/${props.ledger.ledger_id}/edit`}>
            <BiPencil />
          </Link>
        </div>
        <div class="flex justify-end px-4 pt-4"></div>
        <div class="flex flex-col items-center">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {props.ledger.ledger_name}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">Balance</span>
          <span class={`text-xl ${dollarColor}`}>{dollarAmount}</span>
          <div className="flex flex-wrap gap-5 mt-5">
            <Link
              to={`/ledger/${props.ledger.ledger_id}/new-transaction`}
              state={{ data: props.ledger }}
              className={`flex items-center justify-center flex-1 ${styles.button}`}
            >
              Add Transaction
            </Link>
            <Link
              to={`/ledger/${props.ledger.ledger_id}/history`}
              state={{ data: props.ledger }}
              className={`flex items-center justify-center flex-1 ${styles.buttonAlt}`}
            >
              View History
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

{
  /* <Link to={`/ledger/${props.ledger.ledger_id}/edit`}>
  <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    New Transaction
  </button>
</Link>; */
}

{
  /* <div class="flex">
  <button
    type="button"
    class="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Default
  </button>
  <button
    type="button"
    class="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Another Button With More Text
  </button>
</div>; */
}

/*  <div className="absolute top-0 right-0">
   <Link to={`/ledger/${props.ledger.ledger_id}/edit`}>
     <BiPencil />
   </Link>
 </div>; */
