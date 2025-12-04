"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookieValue } from "@/function/cookie";

export default function useRedirectByRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      try {
       

        // 2️⃣ Check localStorage user data
        if (!localStorage.getItem("partnerdata")) {
          const res = await axios.get(`${BASEURL}/api/user/profile`, {
        
            headers: {
            "Authorization": `Bearer ${getCookieValue()}`  // <-- Add your JWT token here
            }
          });
          localStorage.setItem("partnerdata", JSON.stringify(res.data));
        }

      } catch (err) {
        console.error("Error checking role:", err);
        router.replace("/auth/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [router, BASEURL]);

  return loading;
}
