import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/auth";
import { ledgerApi } from "../../api/ledger";
import { LedgerCard } from "./components/ledgerCard";

export function Dashboard(props) {
  const userData = useContext(UserContext);
  const [ledgers, setLedgers] = useState(null);

  useEffect(() => {
    console.log(
      "TEST..ASD8FHAS8DFHAS8DFHASDFA98SHFA98HDF98ASF9HAS98DFHA98DHF98ADF9AH8FAS98DFHAHDF8A9DHF98AHDFH........."
    );
    console.log(userData?.user?.user.current_organization);
    if (userData?.user?.user.current_organization) {
      console.log("Test......");
      const fetchData = async () => {
        console.log("FETCH!!");
        const ledgers = await ledgerApi.fetchOrgUsers(
          userData?.user?.user.current_organization
        );

        console.log("Ledgers:::");
        console.log(ledgers);
        setLedgers(ledgers);
      };
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ledgers && (
          <>
            <LedgerCard ledger={ledgers[0]} />
            <LedgerCard ledger={ledgers[1]} />
          </>
        )}
      </div>
    </>
  );
}
