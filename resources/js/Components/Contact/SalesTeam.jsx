import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';

function initials(name = '') {
    return name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function avatarAlt(member) {
    return member.image ? `${member.name}, ${member.role}` : `${member.name} avatar`;
}

function Avatar({ member }) {
    if (member.image) {
        return (
            <img
                src={member.image}
                alt={avatarAlt(member)}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover"
            />
        );
    }

    return (
        <span
            aria-hidden="true"
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-base font-bold text-primary-dark"
        >
            {initials(member.name)}
        </span>
    );
}

export default function SalesTeam({ members }) {
    if (!members || members.length === 0) {
        return null;
    }

    return (
        <section className="border-y border-border bg-background" aria-labelledby="sales-team-heading">
            <Container className="py-8 sm:py-10 lg:py-12">
                <Reveal>
                    <SectionHeading
                        id="sales-team-heading"
                        eyebrow="Meet your sales team"
                        title="A real person helps you get connected"
                        description="Skip the menus. Talk directly to the person who handles your area or service type — they will sort the rest."
                    />
                </Reveal>

                <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <Reveal key={member.email ?? member.name} delay={(index % 3) * 80} className="h-full">
                            <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                                <div className="flex items-center gap-4">
                                    <Avatar member={member} />
                                    <div className="min-w-0">
                                        <h3 className="truncate text-base font-bold text-foreground">
                                            {member.name}
                                        </h3>
                                        <p className="mt-0.5 text-sm font-medium text-primary">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                                    {member.description}
                                </p>

                                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                                    {member.phone ? (
                                        <a
                                            href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary-dark transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                        >
                                            <Icon name="phone" className="h-4 w-4" />
                                            Call
                                        </a>
                                    ) : (
                                        <span />
                                    )}

                                    <div className="flex items-center gap-1.5">
                                        {member.email ? (
                                            <a
                                                href={`mailto:${member.email}`}
                                                aria-label={`Email ${member.name}`}
                                                title={`Email ${member.name}`}
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                            >
                                                <Icon name="mail" className="h-4 w-4" />
                                            </a>
                                        ) : null}
                                        {member.whatsapp ? (
                                            <a
                                                href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`WhatsApp ${member.name}`}
                                                title={`WhatsApp ${member.name}`}
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                            >
                                                <Icon name="whatsapp" className="h-4 w-4" />
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}