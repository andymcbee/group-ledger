import { CreateLedger } from "../../views/createLedger/createLedger";
import { CreateLedgerTransaction } from "../../views/createLedgerTransaction/createLedgerTransaction";
import { LedgerTransactionHistory } from "../../views/transactionHistory/ledgerTransactionHistory";

const Routes = [
  {
    path: "/create-ledger",
    view: CreateLedger,
    layout: "app",
    permission: "Admin",
    title: "Create Ledger",
  },
  {
    path: "/ledger/:ledger_id/new-transaction",
    view: CreateLedgerTransaction,
    layout: "app",
    permission: "Admin",
    title: "New Transaction",
  },
  {
    path: "/ledger/:ledger_id/history",
    view: LedgerTransactionHistory,
    layout: "app",
    permission: "Admin",
    title: "Transaction History",
  },
];

export default Routes;
