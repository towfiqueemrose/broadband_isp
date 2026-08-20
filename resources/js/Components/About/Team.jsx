import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import SectionHeading from '@/Components/UI/SectionHeading';
import Button from '@/Components/UI/Button';

export default function Team({ members }) {
    if (!members || members.length === 0) {
        return null;
    }

    return (
        <section className="py-16 sm:py-20 lg:py-14" aria-labelledby="team-heading">
            <Container>
                <SectionHeading
                    eyebrow="Meet The Team"
                    title="Leadership"
                    description="The people driving our vision forward"
                    align="center"
                    id="team-heading"
                />

                <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <Reveal key={member.name} delay={index * 80}>
                            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-soft">
                                <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-soft to-accent/20">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={`Photo of ${member.name}`}
                                            className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-soft"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-white/20">
                                            <Icon name="user" className="h-10 w-10 text-primary" />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                <p className="mt-2 text-sm font-medium text-muted">{member.role}</p>
                                <p className="mt-4 text-sm leading-relaxed text-muted/80">
                                    {member.description}
                                </p>

                                <div className="mt-6 flex justify-center gap-3">
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-muted transition-all duration-200 hover:bg-primary-soft hover:text-primary-dark"
                                            aria-label={`Connect with ${member.name} on LinkedIn`}
                                        >
                                            <Icon name="linkedin" className="h-5 w-5" />
                                        </a>
                                    )}
                                    {member.twitter && (
                                        <a
                                            href={member.twitter}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-muted transition-all duration-200 hover:bg-primary-soft hover:text-primary-dark"
                                            aria-label={`Follow ${member.name} on Twitter`}
                                        >
                                            <Icon name="twitter" className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

