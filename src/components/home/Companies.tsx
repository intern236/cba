
const companies = [
    {
        name: "Microsoft",
        logo: "/images/Microsoft.png",
        className: "max-w-[145px]",
    },
    {
        name: "Adobe",
        logo: "/images/Adobe.png",
        className: "max-w-[110px]",
    },
    {
        name: "Cognizant",
        logo: "/images/Cognizant.jpg",
        className: "max-w-[155px]",
    },
    {
        name: "BNI",
        logo: "/images/Bni.png",
        className: "max-w-[100px]",
    },
];

export function CorporateTournaments() {
    return (
        <section
            aria-labelledby="corporate-title"
            className="on-light overflow-hidden bg-chalk py-10 sm:py-12 lg:py-14"
        >
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
                {/* Section heading */}
                <div className="max-w-[820px]">
                    <p className="eyebrow text-mat">BEYOND THE COURT</p>

                    <h2
                        id="corporate-title"
                        className="display mt-3 text-[clamp(2.1rem,4.5vw,4rem)] leading-[1.05] tracking-tight"
                    >
                        Bringing teams together through sport.
                    </h2>

                    <p className="mt-4 max-w-[680px] text-base leading-relaxed text-ink-soft sm:text-lg">
                        We host corporate badminton tournaments that bring colleagues
                        and communities together through competition, teamwork and a
                        shared love of the game.
                    </p>
                </div>

                {/* Company logos */}
                <div className="mt-8 sm:mt-9">
                    <p className="eyebrow text-ink-soft">
                        CORPORATE TEAMS WE HAVE HOSTED
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {companies.map((company) => (
                            <div
                                key={company.name}
                                className="group flex min-h-[112px] items-center justify-center rounded-2xl border border-ink/10 bg-chalk-2 px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-mat/50 hover:bg-chalk hover:shadow-md sm:min-h-[130px] sm:px-5"
                            >
                                <div className="flex w-full flex-col items-center gap-2.5">
                                    <div className="flex h-10 w-full items-center justify-center sm:h-12">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={company.logo}
                                            alt={`${company.name} logo`}
                                            loading="lazy"
                                            className={`max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-12 ${company.className}`}
                                        />
                                    </div>

                                    <span className="text-center text-sm font-medium text-ink-soft transition-colors duration-200 group-hover:text-ink">
                                        {company.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        Alongside these teams, we have hosted tournaments for other
                        corporate groups.
                    </p>
                </div>

                {/* Tournament highlights */}
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <article className="group rounded-2xl border border-ink/10 bg-chalk-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-mat/40 hover:shadow-md sm:p-6">
                        <p className="eyebrow text-mat">STATE-LEVEL EVENT</p>

                        <h3 className="display mt-3 text-2xl leading-tight transition-colors duration-300 group-hover:text-mat sm:text-3xl">
                            Uttar Pradesh State Championship
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                            Our academy has hosted the Uttar Pradesh State Championship
                            tournament, welcoming competitive badminton at the state level.
                        </p>
                    </article>

                    <article className="group rounded-2xl border border-ink/10 bg-chalk-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-mat/40 hover:shadow-md sm:p-6">
                        <p className="eyebrow text-mat">MAY 2025</p>

                        <h3 className="display mt-3 text-2xl leading-tight transition-colors duration-300 group-hover:text-mat sm:text-3xl">
                            Malhotra Badminton Cup
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                            We also hosted the Malhotra Badminton Cup in May 2025,
                            bringing players together for a dedicated badminton event.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
