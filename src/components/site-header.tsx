"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  List,
  X,
  Phone,
  WhatsappLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

import { academy, trialLink } from "@/lib/academy";
import { navLinks, moreLinks } from "@/lib/nav";
import { Mark } from "./shuttle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Close the mobile menu when navigating to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle Escape and prevent background scrolling while the menu is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Match routes such as "/programs/", "programs.html",
  // and "/x/programs.html".
  const seg = (s: string) =>
    (s.split("/").filter(Boolean).pop() ?? "")
      .replace(/\.html$/, "")
      .replace(/^index$/, "");

  const isActive = (href: string) =>
    seg(pathname ?? "") === seg(href);

  return (
    <>
      {/* Fixed navbar: stays at the top on every page */}
      <m.header
        className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={false}
        animate={{ y: 0 }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1320px] items-center gap-2 rounded-full border border-white/10 bg-court-950/80 py-2 pl-4 pr-2 text-chalk shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_-18px_rgba(7,28,23,0.9)] backdrop-blur-md sm:pl-5"
        >
          {/* Academy logo */}
          <Link
            href="/"
            className="mr-auto flex min-w-0 items-center gap-2.5 rounded-full py-1"
          >
            <Mark className="h-8 w-8 text-chalk" />

            <span className="leading-none">
              <span className="display block text-[1.35rem] tracking-[0.01em]">
                Celestial&rsquo;s
              </span>

              <span className="eyebrow mt-0.5 block text-[0.6rem] text-chalk/60">
                Badminton Academy
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={
                    isActive(l.href) ? "page" : undefined
                  }
                  className="relative rounded-full px-4 py-2.5 text-[0.94rem] font-medium text-chalk/75 transition-colors hover:text-chalk aria-[current=page]:text-chalk"
                >
                  {isActive(l.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                    />
                  )}

                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Free trial button */}
          <a
            href={trialLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary ml-1 !min-h-[44px] shrink-0 !px-4 sm:!px-5"
          >
            <span>
              Free trial
              <span className="sr-only">
                {" "}(opens WhatsApp in a new tab)
              </span>
            </span>

            <ArrowUpRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="hidden sm:block"
            />
          </a>

          {/* Mobile menu button */}
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-3 text-[0.94rem] font-medium text-chalk/85 hover:text-chalk lg:hidden"
          >
            <List size={20} weight="bold" aria-hidden="true" />
            Menu
          </button>
        </nav>
      </m.header>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-court-950 px-5 pb-8 pt-5 text-chalk lg:hidden"
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -16 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex items-center justify-between">
              <span className="display text-2xl">
                Celestial&rsquo;s
              </span>

              <button
                type="button"
                autoFocus
                onClick={() => {
                  setOpen(false);
                  menuBtn.current?.focus();
                }}
                className="flex min-h-[44px] items-center gap-2 rounded-full px-4 font-medium ring-1 ring-white/25"
              >
                <X
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
                Close
              </button>
            </div>

            <ul className="mt-6 flex min-h-0 flex-col overflow-y-auto">
              {[{ href: "/", label: "Home" }, ...navLinks, ...moreLinks].map(
                (l, i) => (
                  <m.li
                    key={l.href}
                    initial={
                      reduce ? false : { opacity: 0, x: -14 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 * i,
                      duration: 0.3,
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        isActive(l.href) ? "page" : undefined
                      }
                      className="display flex items-center justify-between py-3 text-[2.15rem] aria-[current=page]:text-lime"
                    >
                      {l.label}
                    </Link>
                  </m.li>
                ),
              )}
            </ul>

            {/* Mobile action buttons */}
            <div className="mt-auto grid gap-3 pt-8">

              <div className="grid grid-cols-3 gap-2 text-sm">

                {academy.contact.whatsappUrl && (
                  <a
                    href={academy.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-full ring-1 ring-white/20"
                  >
                    <WhatsappLogo
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                    />
                    WhatsApp
                  </a>
                )}

                <a
                  href={academy.contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full ring-1 ring-white/20"
                >
                  <InstagramLogo
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                  />
                  Instagram
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}