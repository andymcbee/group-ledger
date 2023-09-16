import { Card } from "../../components/card/card";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styles } from "../../styles";
import { ledgerApi } from "../../api/ledger";
import { UserContext } from "../../app/auth";
import { toast } from "react-toastify";

export function CreateLedgerTransaction() {
  const { input, button, form, select } = styles;

  const location = useLocation();
  const userData = useContext(UserContext);

  const { data } = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: null,
      date: new Date(),
      description: null,
      transactionType: null,
    },
  });

  const submitHandler = async (formData) => {
    try {
      const currentOrgId = userData?.user?.user.current_organization;
      const currentLedgerId = data?.ledger_id;

      const apiPostData = {
        amount_cents: formData.amount * 100, //form is in dollars. * 100 to convert to cents.
        description: formData.description,
        transaction_date: formData.date,
        transaction_type: formData.transactionType,
      };

      console.log(apiPostData);

      await ledgerApi.createTransaction(
        currentOrgId,
        currentLedgerId,
        apiPostData
      );
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Card title={`Create new transaction for ${data.ledger_name}`}>
        <form
          className={form}
          onSubmit={handleSubmit((data) => submitHandler(data))}
        >
          <div>
            <label htmlFor="amount">Amount in dollars</label>
            <input
              className={input}
              id="amount"
              {...register("amount", {
                required: "Amount is required",
                validate: {
                  matchPattern: (v) => {
                    if (isNaN(v) || !/^\d+(\.\d{2})?$/.test(v.toString())) {
                      return "Please enter either a whole number or one with two decimal places";
                    }
                    return undefined;
                  },
                },
              })}
            />
            {errors.amount?.message && (
              <small className="block text-red-600">
                {errors.amount.message as string}
              </small>
            )}
          </div>
          <div>
            <label htmlFor="transactionType">Transaction type</label>
            <select
              className={select}
              id="transactionType"
              {...register("transactionType", {
                required: "Transaction type is required",
              })}
            >
              <option selected>Choose a transaction type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            {errors.amount?.message && (
              <small className="block text-red-600">
                {errors.amount.message as string}
              </small>
            )}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              className={input}
              id="date"
              type="date"
              {...register("date", {
                valueAsDate: true,
                required: "Date is required",
              })}
            />
            {errors.date?.message && (
              <small className="block text-red-600">
                {errors.date.message as string}
              </small>
            )}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              className={input}
              id="description"
              {...register("description", {})}
            />
            {errors.description?.message && (
              <small className="block text-red-600">
                {errors.description.message as string}
              </small>
            )}
          </div>
          <button className={button} type="submit">
            Submit
          </button>
        </form>
      </Card>
    </>
  );
}
