import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/auth";
import { ledgerApi } from "../../api/ledger";
import { LedgerCard } from "./components/ledgerCard";

export function Dashboard() {
  const userData = useContext(UserContext);
  const [ledgers, setLedgers] = useState(null);

  useEffect(() => {
    console.log(userData?.user?.user.current_organization);
    if (userData?.user?.user.current_organization) {
      const fetchData = async () => {
        const ledgers = await ledgerApi.fetchOrgUsers(
          userData?.user?.user.current_organization
        );

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
