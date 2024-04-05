"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// I didn't see a homepage on the mobile designs, perhaps this is still a WiP?
// Currently, I am redirecting to the activities page.
const RedirectToMobileActivities = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/mobile/activities");
  }, [router]);
  return null;
};

export default RedirectToMobileActivities;
