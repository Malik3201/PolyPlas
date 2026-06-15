import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import PromoMarquee from "@/components/home/PromoMarquee";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
import { getSiteSettings } from "@/app/actions/settings";
import { getCategories } from "@/app/actions/categories";
import { getFeaturedProducts } from "@/app/actions/products";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings?.metaTitle || `${settings?.websiteName || "Lasani Disposables"} — Premium Disposable Products`,
    description: settings?.metaDescription || settings?.heroSubtitle,
  };
}

export default async function HomePage() {
  const [settings, categories, featuredProducts] = await Promise.all([
    getSiteSettings(),
    getCategories(true),
    getFeaturedProducts(6),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <PromoMarquee />
      <CategorySection categories={categories} />
      <FeaturedProducts products={featuredProducts} settings={settings} />
      <WhyChooseUs />
      <TestimonialSection />
      <CTASection settings={settings} />
    </>
  );
}
