import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { getSiteSettings } from "@/app/actions/settings";
import { buildWhatsAppUrl } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lasani Disposables for product enquiries and bulk orders.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  return (
    <div className="pb-20">
      <div className="container-site pt-8">
        <div className="text-center mb-16">
          <p className="section-label justify-center mb-3">Get in Touch</p>
          <h1 className="heading-display text-4xl sm:text-5xl text-ink mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-ink-muted text-lg max-w-xl mx-auto">
            The fastest way to reach us is WhatsApp. We typically respond within an hour.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {settings?.whatsappNumber && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 bg-[#25D366]/5 border-2 border-[#25D366]/20 rounded-3xl hover:bg-[#25D366]/10 transition-all duration-300 group hover:shadow-soft"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <WhatsAppIcon size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-ink">WhatsApp (Preferred)</div>
                  <div className="text-ink-muted text-sm mt-0.5">{settings.whatsappNumber}</div>
                  <div className="text-[#25D366] text-xs mt-2 font-bold uppercase tracking-wider">Chat now →</div>
                </div>
              </a>
            )}

            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-start gap-4 p-6 bg-white border border-cream-200 rounded-3xl hover:border-brand-200 hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-brand-600" />
                </div>
                <div>
                  <div className="font-semibold text-ink">Phone</div>
                  <div className="text-ink-muted text-sm mt-0.5">{settings.phone}</div>
                </div>
              </a>
            )}

            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-4 p-6 bg-white border border-cream-200 rounded-3xl hover:border-brand-200 hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-brand-600" />
                </div>
                <div>
                  <div className="font-semibold text-ink">Email</div>
                  <div className="text-ink-muted text-sm mt-0.5">{settings.email}</div>
                </div>
              </a>
            )}

            {settings?.address && (
              <div className="flex items-start gap-4 p-6 bg-white border border-cream-200 rounded-3xl shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-brand-600" />
                </div>
                <div>
                  <div className="font-semibold text-ink">Address</div>
                  <div className="text-ink-muted text-sm mt-0.5 leading-relaxed">{settings.address}</div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4 p-6 bg-white border border-cream-200 rounded-3xl shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-brand-600" />
              </div>
              <div>
                <div className="font-semibold text-ink">Business Hours</div>
                <div className="text-ink-muted text-sm mt-0.5 space-y-0.5">
                  <div>Mon – Sat: 9:00 AM – 7:00 PM</div>
                  <div>Sunday: By appointment</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative rounded-4xl overflow-hidden h-full min-h-[480px]">
              <div className="absolute inset-0 bg-brand-gradient" />
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }} />
              <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-[#25D366] flex items-center justify-center mb-8 shadow-lg">
                    <WhatsAppIcon size={30} className="text-white" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl text-white mb-4 leading-snug">
                    The fastest way to reach us
                  </h2>
                  <p className="text-cream-200/70 leading-relaxed mb-8 text-lg">
                    Message us with your product inquiry, quantity needed, and delivery
                    location. We&apos;ll respond with a custom quote — usually within an hour.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Bulk order pricing",
                      "Product availability",
                      "Custom branding inquiries",
                      "Delivery arrangements",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-cream-200 text-sm">
                        <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 text-base hover:scale-[1.02] shadow-lg"
                >
                  <WhatsAppIcon size={20} />
                  Open WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
