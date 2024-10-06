import { getCurrentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import SettingsMain from "./_components/settings-tab";



const SettingsPage = async () => {

  const user = await getCurrentUser();
  if (!user?.email) {
    return redirect("/");
  }
  

  return (
    <div>
      <SettingsMain data={user}></SettingsMain>
    </div>
  );
};

export default SettingsPage;
