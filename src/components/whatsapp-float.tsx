import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

export function WhatsAppFloat() {
    const phoneNumber = "918826268236";
    const message = encodeURIComponent(
        "Hi, I would like to know more about badminton coaching at Celestial's Badminton Academy."
    );

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        >
            <WhatsappLogoIcon size={32} weight="fill" />
        </a>
    );
}