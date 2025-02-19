// import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Products from "@/components/Product";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const ProductDetails = () => {
  return (
    <DefaultLayout>
      <Products />
    </DefaultLayout>
  );
};

export default ProductDetails;
