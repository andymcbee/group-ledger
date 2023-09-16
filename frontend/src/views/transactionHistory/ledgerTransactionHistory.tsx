import { Card } from "../../components/card/card";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../app/auth";
import { ledgerApi } from "../../api/ledger";
import { useLocation } from "react-router-dom";
import { convertCentsToDollars } from "../../utils/convertCentsToDollars";
import { displayIsoDateAsHumanReadable } from "../../utils/displayIsoDateAsHumanReadable";

const TABLE_HEAD = ["Amount", "Type", "Description", "Date"];

export function LedgerTransactionHistory(props) {
  const { user } = useContext(UserContext) ?? { user: null }; // Provide a default value for user
  const [tableRows, setTableRows] = useState([]);
  const location = useLocation();

  const ledger_id = location.state?.data?.ledger_id;

  const current_organization_id = user?.user.current_organization;

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await ledgerApi.fetchAllTransactions(
        current_organization_id,
        ledger_id
      );

      const tableRowData = transactions.map((item) => {
        const transactionData = {
          amount: convertCentsToDollars(item.amount_cents),
          type: item.transaction_type,
          description: item.description,
          date: displayIsoDateAsHumanReadable(item.created_at),
        };
        return transactionData;
      });
      setTableRows(tableRowData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Card title={props.title}>
        <table className="text-left flex-1">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ amount, id, description, date, type }, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>{amount} </td>
                  <td className={classes}>{type}</td>

                  <td className={classes}>{description}</td>
                  <td className={classes}>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
