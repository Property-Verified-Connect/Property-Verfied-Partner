"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import inter from "@/lib/font/Inter";
import { useSearchParams } from "next/navigation";




export default function ResetPasswordForm() {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;
const searchParams = useSearchParams();
const hashParams = new URLSearchParams(window.location.hash.substring(1));
const token = hashParams.get("access_token");
console.log(token);


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });


  console.log( "access_token-" ,token)

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};

    // Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASEURL}/api/auth/update-password`,
        {
          password: formData.password,
          token : token
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
      alert(res.data.message || "Password reset successfully!");

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

   useEffect(()=>{
   console.log(token)
   },[])





  return (
    <div className={`${inter.className}`}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6 w-[95%] md:w-[30rem] bg-white rounded-lg shadow-md">
      <div className="h-20 w-60 m-auto flex items-center justify-center">
        <Image
          src="/image/Logo.png"
          alt="logo"
          width={140}
          height={100}
          className="scale-140"
        />
      </div>

      <h2 className="text-[#247FBA] text-2xl font-bold mb-6 text-center">
        Reset Your Password
      <p className="text-xs font-bold  text-zinc-400">Enter Your Reseted Password here</p>
      </h2>


      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-700 text-sm text-center">
            ✓ Your password has been updated. Redirecting…
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-[#247FBA] mb-2">
              New Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-[#247FBA] mb-2">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="group w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA]"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-2xl h-4 w-4 border-b-2 border-white group-hover:border-[#247FBA]"></div>
              </div>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      )}
    </div>

    </div>
  );
}
