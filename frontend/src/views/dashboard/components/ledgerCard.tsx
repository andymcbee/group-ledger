import { Card } from "../../../components/card/card";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { styles } from "../../../styles";
import { convertCentsToDollars } from "../../../utils/convertCentsToDollars";

export function LedgerCard(props) {
  const total_cents = props.ledger.total_amount_cents;

  const dollarAmount = convertCentsToDollars(total_cents);

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
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {props.ledger.ledger_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Balance
          </span>
          <span className={`text-xl ${dollarColor}`}>{dollarAmount}</span>
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
