import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DialogBox from "../DialogBox";

export default function Wallet({ data }) {
  const [amountBox, setAmountBox] = useState(false);
  const [userData, setUserData] = useState({});

  const addMoneyToWallet = async (e) => {
    e.preventDefault();
    const amount = e.target.elements.amount.value;

    try {
      const response = await axios.post(
        `${baseUrl}/api/post/spark`,
        {
          amount: Number(amount),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setAmountBox(false);
        setUserData((prevData) => ({
          ...prevData,
          wallet: {
            ...prevData.wallet,
            amount: (prevData?.wallet?.amount || 0) + Number(amount),
          },
        }));
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);
  return (
    <div>
      <DialogBox open={amountBox}>
        <form onSubmit={addMoneyToWallet}>
          <h3>Amount</h3>
          <input
            type="number"
            name="amount"
            className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
            placeholder="Enter Amount"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setAmountBox(false);
              }}
              className="mt-auto py-2 w-full px-4 font-medium text-sm border rounded-[8px] text-black bg-gray-100 hover:bg-gray-200 lg:text-medium "
            >
              Cancle
            </button>
            <button
              type="submit"
              className="mt-auto  w-full py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogBox>

      <h1 className="text-xl font-semibold mt-5">
        Current Balance : {userData?.wallet?.amount || "00.00"}
      </h1>
      <h1 className="text-xl font-semibold mt-5">
        Amount on Hold : {userData?.wallet?.balanceOnHold || "00.00"}
      </h1>
      <button
        onClick={() => {
          setAmountBox(true);
        }}
        className={`bg-black text-white max-w-[400px] w-fit my-3 py-2 px-3 rounded-lg`}
      >
        Add Money to your wallet
      </button>
    </div>
  );
}
