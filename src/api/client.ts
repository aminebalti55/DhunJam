import { restClient } from "./config";

export type USER = {
  username: string;
  password: string;
};

export type ADMIN_DETAILS = {
  amount: { [key: string]: number }[];
  business_type: string;
  charge_customers: boolean;
  display_amount: boolean;
  hosts: string[];
  id: number;
  location: string;
  name: string;
  category_6: number; 

};

export const loginAdmin = async (data: USER) => {
  const user = await restClient.post("/account/admin/login", {
    username: data.username,
    password: data.password,
  });
  return user.data.data as { token: string };
};

//  https://stg.dhunjam.in/account/admin/4
export const getAdminDetails = async (): Promise<ADMIN_DETAILS> => {
  const user = await restClient.get("/account/admin/4");
  return user.data.data;
};
