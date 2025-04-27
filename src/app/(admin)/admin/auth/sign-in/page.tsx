import AdminSignInPage from "@/components/Admin/Auth/AdminSignInPage";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { redirect } = await searchParams;

  return <AdminSignInPage redirectURL={redirect} />;
};

export default page;
