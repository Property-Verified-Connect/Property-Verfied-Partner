"use client";
import React, { useState, JSX } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { INDIAN_CITIES } from "./Contactcard";
import { CloudHail, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type FormData = {
  name: string;
  email: string;
  contact: string;
  city: string;
  password: string;
  confirmPassword: string;
  CompanyName:string ;
  role: string;
  excutiveType: string;
  rera: string;
  terms: boolean;
};

  type Errors = Record<string, string>;

  export default function SignInForm(): JSX.Element {
    const router = useRouter();
    const [idProof, setIdProof] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfrom, setShowPasswordConfrom] = useState(false);
    

    const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      contact: "",
      CompanyName:"",
    city: "",
    password: "",
    confirmPassword: "",
    role: "partner",
    excutiveType: "",
    rera: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  const Excutive: [string, string, string] = [
    "Company Owner",
    "Company Excutive",
    "Freelancer",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    if (!formData.CompanyName) newErrors.CompanyName = "Company Name is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must accept terms";

    setErrors(newErrors);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("contact", formData.contact);
    form.append("city", formData.city);
    form.append("role", formData.role);
    form.append("CompanyName", formData.CompanyName);
    form.append("excutiveType", formData.excutiveType);
    form.append("rera", formData.rera);

    if (idProof) {
      form.append("idProof", idProof);
    }

    console.log("FormData as object:", Object.fromEntries(form.entries()));

    if (Object.keys(newErrors).length === 0) {
      const loadingToast = toast.loading("Signing up...");
      try {
        const res = await axios.post<{ message: string }>(`/api/auth/signin`,form);

        toast.dismiss(loadingToast);

        Cookies.remove("client_token_partner", { path: "/" });
        localStorage.clear()

        Cookies.set("client_token_partner", res.data.token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        toast.success("Signed up successfully!");
        router.push("/dashboard/partner");
        if (res.status == 200) {
          toast.success("Sign in successfully ");
        } else if (res.status == 400) {
          toast.error(res.data.message);
        }

        // alert(res.data.message);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          // attempt to read server error message
             toast.dismiss(loadingToast);
          const serverMsg =
            (err.response.data as { error?: string })?.error ?? err.message;
         toast.error(serverMsg);
          router.push("/auth/login");
        } else {
             toast.dismiss(loadingToast);
          toast.error(String(err));
        }
      }
      // Reset form if needed
      // setFormData({ name: "", email: "", contact: "", city: "", password: "", confirmPassword: "", terms: false, role: "user" });
    }
  };

  return (
    <div className=" absolute min-h-screen  max-w-md p-6  w-94 md:w-[29rem] bg-white rounded-lg shadow-md">
      <div className="h-20 w-60  m-auto flex items-center justify-center">
        <Image
          src="/image/Logo.png"
          alt="logo"
          width={140}
          height={100}
          className="  scale-140"
        ></Image>
      </div>
      <div
        className={`${inter.className} flex items-center justify-center flex-col`}
      >
        <h2
          className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center`}
        >
          Partner Sign Up
        </h2>
        <p className="-mt-6 text-xs font-bold text-center  text-gray-400 mb-3">
          Create an Account <br /> And Connect with your interested verified
          property{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit} className={`${inter.className} space-y-4 `}>
        {/* Name */}
        <div className=" flex items-center justify-between gap-3">
          <div>
            <Label htmlFor="name" className="mb-2 text-[#247FBA]">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-2 text-[#247FBA]">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="flex md:flex-row flex-col gap-3">
          <div>
            <Label htmlFor="contact" className="mb-2  text-[#247FBA]">
              Contact
            </Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter Contact No."
              value={formData.contact}
              onChange={handleChange}
            
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact}</p>
            )}
          </div>

          {/* Select City */}
          {/* <div>
          <Label htmlFor="city" className="mb-2 text-[#247FBA]">Select City</Label>
          <Select
            value={formData.city}
            onValueChange={(value: string) => setFormData((prev) => ({ ...prev, city: value }))}
          >
            <SelectTrigger className="w-48"  >
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="Nagpur">Nagpur</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div> */}

          <div>
            <Label htmlFor="city" className="mb-2 text-[#247FBA]">
              City
            </Label>
            <Select
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, city: value }))
              }
              value={formData.city}
            >
              <SelectTrigger className="w-full md:w-50 ">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {INDIAN_CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

   <div>
            <Label htmlFor="contact" className="mb-2 text-[#247FBA]">
           CompanyName
            </Label>
            <Input
              id="CompanyName"
              name="CompanyName"
              type="text"
              placeholder="Enter Company Name."
              value={formData.CompanyName}
              onChange={handleChange}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.CompanyName}</p>
            )}
          </div>



        <div>
          <Label htmlFor="city" className="mb-2 text-[#247FBA]">
            Type of Excetive
          </Label>
          <Select
            onValueChange={(value: string) =>
              setFormData((prev) => ({ ...prev, excutiveType: value }))
            }
            value={formData.excutiveType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {Excutive.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <Label className="mb-2 text-[#247FBA]">Upload ID Proof</Label>
          <Input
            id="idProof"
            name="idProof"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setIdProof(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 text-[#247FBA]">
            Rera Number (Optional)
          </Label>
          <Input
            id="rera"
            name="rera"
            type="text"
            placeholder="Enter Rera Number"
            value={formData.rera}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Label htmlFor="password" className="mb-2 text-[#247FBA]">
            Password
          </Label>
          <Input
            id="password"
            name="password"
         type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
             <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-2  text-gray-600 hover:text-[#247FBA]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>

        {/* Re-enter Password */}
        <div  className="relative">
          <Label htmlFor="confirmPassword" className="mb-2 text-[#247FBA]">
            Re-enter Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
          type={showPasswordConfrom ? "text" : "password"}
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
           <button
              type="button"
              onClick={() => setShowPasswordConfrom(!showPasswordConfrom)}
              className="absolute right-2 bottom-2  text-gray-600 hover:text-[#247FBA]"
            >
              {showPasswordConfrom ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.terms}
            onCheckedChange={(checked: boolean) =>
              setFormData((prev) => ({ ...prev, terms: checked }))
            }
          />
          <Label htmlFor="terms" className="text-[#247FBA]">
            I agree to the Terms & Conditions
          </Label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA] "
        >
          Sign Up
        </Button>
      </form>
      <p className="mt-1 text-xs font-bold text-center text-gray-400  ">
        Aleady have the Account ,{" "}
        <Link href={"/auth/login"}>
          {" "}
          <span className="hover:underline">Login</span>{" "}
        </Link>{" "}
      </p>
    </div>
  );
}
