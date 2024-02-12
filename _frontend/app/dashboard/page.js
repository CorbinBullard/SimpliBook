"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  router.push("/dashboard/calendar");
  return null;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, options);

  // Return the session as props to the page component
  return {
    props: {
      session, // This will be passed to the page component as a prop
    },
  };
}
