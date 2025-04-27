import SignInPage from "@/components/StoreFront/Auth/SignInPage";
import React, { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { redirect } = await searchParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage redirectURL={redirect} />
    </Suspense>
  );
};

export default Page;
