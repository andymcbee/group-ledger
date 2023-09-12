import { api, organizationRoute } from "./config/config";
import { toast } from "react-toastify";

//ledger routes

export const ledgerApi = {
  fetchOrgUsers: async (organization_id) => {
    try {
      const res = await api.request({
        url: `${organizationRoute}/${organization_id}/ledger/many`,
        method: "GET",
      });
      console.log("RES:::");
      console.log(res);

      return res.data.ledgers || null;
    } catch (error) {
      console.log(error.response);
      throw error.response.data.message || "Error fetching users!";
    }
  },
  createTransaction: async (organization_id, ledger_id, data) => {
    try {
      const res = await api.request({
        url: `${organizationRoute}/${organization_id}/ledger/${ledger_id}/transaction`,
        method: "POST",
        data,
      });
      console.log("RES:::");
      console.log(res);
      toast.success("Success!");

      return res.data.ledgers || null;
    } catch (error) {
      console.log(error.response);
      throw error.response.data.message || "Error fetching users!";
    }
  },
  fetchAllTransactions: async (organization_id, ledger_id) => {
    try {
      const res = await api.request({
        url: `${organizationRoute}/${organization_id}/ledger/${ledger_id}/transaction/many`,
        method: "GET",
      });
      console.log("RES:::");
      console.log(res.data.transactions);

      return res.data.transactions || null;
    } catch (error) {
      console.log(error.response);
      throw error.response.data.message || "Error fetching transactions";
    }
  },
};
