import { useQuery } from "@tanstack/react-query";
import { getAdminDetails } from "../api/client";
import { useForm } from "react-hook-form";
import { deleteJWT } from "../utils/auth";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "chart.js/auto";

import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
};

const Dashboard = () => {
  const { data, error } = useQuery({
    queryKey: ['adminData'],
    queryFn: getAdminDetails,
  });

  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();

  const chargeCustomersValue = watch('charge_customers');
  const customAmountValue = watch('amount');
  const regularAmounts = watch(['regular_amount_1', 'regular_amount_2', 'regular_amount_3','regular_amount_4']);

  function onSubmitButton(data: any) {
    console.log(data);
  }

  const logout = () => {
    deleteJWT();
    navigate("/");
  };


  useEffect(() => {
    if (error) logout();
  }, [error]);

  useEffect(() => {
    setValue('charge_customers', data?.charge_customers ? 'yes' : 'no');
    setValue('amount', data?.category_6 || ''); 
  }, [data]);

   const adminDataChart = useMemo(() => {
    if (data && chargeCustomersValue === 'yes') {
      return {
        labels: ["Custom", "Category 1", "Category 2", "Category 3","Category 4"],
        datasets: [
          {
            label: 'Categories',
            data: [customAmountValue, ...regularAmounts],
            backgroundColor: ['#F0C3F1', '#F0C3F1', '#F0C3F1', '#F0C3F1','#F0C3F1'],
            borderRadius: 5,
            barThickness: 24,
          },
        ],
      };
    }
    return null;
  }, [data, chargeCustomersValue, customAmountValue, regularAmounts]);

  return (
    <div className="max-w-[450px]">
      <button className="rounded-md fixed top-4 right-4 bg-red-600 px-4 py-2" onClick={logout}>
        Logout
      </button>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-6 text-center ">
          Social ,Hebbal On Dhun Jam
        </h1>
        <form onSubmit={handleSubmit(onSubmitButton)} className="flex justify-between gap-4 flex-col">
          <div className="flex justify-between gap-4 items-center">
            <label>Do you want to charge your customers for requesting songs?</label>
            <div className="flex gap-4">
              <div className="flex items-center mb-4">
                <label htmlFor="request-yes" className="text-sm font-medium ml-2  flex gap-2">
                  <input
                    {...register('charge_customers')}
                    type="radio"
                    value="yes"
                    id="request-yes"
                  />
                  YES
                </label>
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="request-no" className="text-sm font-medium ml-2 flex gap-2">
                  <input
                    {...register('charge_customers')}
                    type="radio"
                    value="no"
                    id="request-no"
                  />
                  NO
                </label>
              </div>
            </div>
          </div>

          {chargeCustomersValue === 'yes' && (
  <>
    <div className="flex justify-between items-center">
      <label>Custom song request amount-</label>
      <input
        {...register('amount', { min: 99 })}
        placeholder="amount"
        className="min-w-[100px] rounded-lg border border-white py-2 text-center text-xs bg-transparent"
      />
    </div>
    <div className="flex justify-between gap-4 items-center">
      <label>Regular song request amounts, from high to low-</label>
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((index) => (
          <input
            key={index}
            {...register(`regular_amount_${index}`, { min: index * 20 - 1 })}
            placeholder="0"
            className="w-[50px] rounded-lg border border-white py-2 text-center text-xs bg-transparent"
          />
        ))}
      </div>
    </div>
  </>
)}

{adminDataChart && <Bar id="test" options={options} data={adminDataChart} />}


<button
  type="submit"
  className={`w-full py-2 rounded-lg bg-violet-600 text-white font-semibold ${
    chargeCustomersValue === 'no' ||
    parseInt(customAmountValue) < 99 ||
    regularAmounts.some((amount, index) => index < 3 && parseInt(amount) < parseInt(regularAmounts[index + 1]))
      ? 'opacity-50 cursor-not-allowed'
      : ''
  }`}
  disabled={
    chargeCustomersValue === 'no' ||
    parseInt(customAmountValue) < 99 ||
    regularAmounts.some((amount, index) => index < 3 && parseInt(amount) < parseInt(regularAmounts[index + 1]))
  }
>
  Save
</button>

        </form>
      </div>
    </div>
  );
};

export default Dashboard;