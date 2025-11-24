import Link from "next/link";
import Head from "next/head";
import HeroSubtitleWithCount from "./components/HeroSubtitleWithCount";
import { Metadata } from "next";

type Event = {
  name: string;
  date: string;
  location: string;
  tag: string;
  description: string;
  eventUrl?: string;
  imageUrl?: string;
};

type Project = {
  name: string;
  team: string;
  event: string;
  description: string;
  projectUrl?: string;
  imageUrl?: string;
};

export const metadate: Metadata = {
  title: "Uvic Hacks",
  description: "Code. Learn. Compete. Victoria's hub for all things hackathon.",
  keywords: ["hackathon", "networking", "uvic", "career", "hackathons", "competition"],
  openGraph: {
    title: "Uvic Hacks",
    description: "Code. Learn. Compete. Victoria's hub for all things hackathon.",
    siteName: "UvicHacks.com",
    locale: "en_US",
    images: [
      {
        url: "https://uvichacks.com/images/og-v2"
      }
    ]
  }
}



export default function Page() {
  const year = new Date().getFullYear();

  const upcomingEvents: Event[] = [
    {
      name: "UVic Hacks: First Meeting",
      date: "Jan 15, 2026",
      location: "ECS 123",
      tag: "Kickoff",
      description:
        "Come hang out, meet the organizers, and learn what UVic Hacks is all about. We’ll go over upcoming events, form interest groups, and help you find teammates.",
      imageUrl: "/images/ecs123.png",
      eventUrl: "/events/first-meeting"
    },
  ];

  const pastEvents: Event[] = [
    {
      name: "Strudel Music Hackathon",
      date: "Nov 16, 2025",
      location: "Hickman 105",
      tag: "Featured",
      description:
        "A one-day creative coding sprint to build generative music with Strudel and friends.",
      imageUrl: "/images/strudel.png",
      eventUrl: "https://jimmer.dev/strudel"
    },
    {
      name: "Inspire Hackathon",
      date: "Oct 3-4, 2025",
      location: "Hickman 105",
      tag: "Featured",
      description:
        "Team up with Inspire UVic to work on software projects for social impact in this two-day hackathon!",
      imageUrl: "/images/inspire.png",
      eventUrl: "/events/inspire-hackathon"
    },
  ];


  const winningProjects: Project[] = [
    {
      name: "Strudel Hackathon Winners",
      team: "Individual",
      event: "Strudel Hackathon: Fall 2025",
      description:
        "Five winning songs for the Strudel Hackathon Fall 2025.",
      projectUrl: "https://strudel.jimmer.dev",
      //imageUrl: "/images/campus-compass.jpg",
    },
  ];


  return (
    <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
      <Head>

        <title>UVic Hacks</title>
        <meta name="description" content="Code. Learn. Compete. Showcase your talent on UVic's biggest stage." />

        <meta property="og:url" content="https://uvichacks.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="UVic Hacks" />
        <meta property="og:description" content="Code. Learn. Compete. Showcase your talent on UVic's biggest stage." />
        <meta property="og:image" content="https://uvichacks.com/images/og-v2.png/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="uvichacks.com" />
        <meta property="twitter:url" content="https://uvichacks.com" />
        <meta name="twitter:title" content="UVic Hacks" />
        <meta name="twitter:description" content="Code. Learn. Compete. Showcase your talent on UVic's biggest stage." />
        <meta name="twitter:image" content="https://uvichacks.com/images/og-v2.png" />

      </Head>
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-blue-950">UVic</span>{" "}
              <span className="text-gold-950">Hacks</span>
            </span>
          </div>

          {/* Right: Nav links + CTA */}
          <div className="ml-auto flex items-center gap-6 text-xs font-medium">
            <div className="hidden items-center gap-6 md:flex">
              <a
                href="#featured"
                className="transition hover:text-blue-300"
              >
                Featured
              </a>
              <a
                href="#upcoming"
                className="transition hover:text-blue-300"
              >
                Upcoming
              </a>
              <a
                href="#about"
                className="transition hover:text-blue-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="transition hover:text-blue-300"
              >
                Contact Us
              </a>
            </div>

            <Link
              href="/join"
              className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-400 hover:shadow-lg"
            >
              Join Now
            </Link>
          </div>
        </nav>

      </header>

      {/* Hero / Featured */}
      <section
        id="featured"
        className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-950">
            UVic Hackathon Club
          </p>

          <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-6xl">
            <span className="block">Code. Learn. <span className="text-gold-950">Compete.</span></span>
          </h1>

          <HeroSubtitleWithCount />

          <p className="mt-3 max-w-xl text-sm text-cool-steel-100">
            UVic Hacks brings together developers, designers, and makers from
            across campus to build ambitious projects, learn new technologies,
            and connect with the local tech community.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#signup"
              className="rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-400 hover:shadow-lg"
            >
              Join the Club
            </a>
            <a
              href="#upcoming"
              className="text-sm font-medium text-cool-steel-200 underline-offset-4 hover:text-blue-300 hover:underline"
            >
              See upcoming events
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section
        id="upcoming"
        className="mx-auto max-w-6xl px-4  md:px-6 "
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="w-full">
            <div className="flex items-center gap-8">
              <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                Upcoming events
              </h2>

              <a
                href="/host"
                className="whitespace-nowrap rounded-full bg-gold-950 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-blue-900/60 transition hover:bg-blue-400 hover:shadow-lg"
              >
                Host Your Own Hackathon!
              </a>
            </div>

            <p className="mt-2 text-sm text-cool-steel-300">
              Hackathons, workshops, and info sessions happening on campus.
            </p>
          </div>
        </div>


        <div className="mt-8 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {upcomingEvents.map((event) => (
            <div key={event.name} className="snap-start shrink-0 w-72">
              <EventCard event={event} />
            </div>
          ))}
        </div>


      </section>

      {/* Winning Projects */}
      <section
        id="projects"
        className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
              Winning student projects
            </h2>
            <p className="mt-2 text-sm text-cool-steel-300">
              Highlights from past UVic Hacks events and partner hackathons.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {winningProjects.map((project) => (
            <div key={project.name} className="snap-start shrink-0 w-72">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>


      </section>

      <section
        id="past"
        className="mx-auto max-w-6xl px-4  md:px-6 "
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
              Past events
            </h2>
            <p className="mt-2 text-sm text-cool-steel-300">
              Hackathons, workshops, and info sessions happening on campus.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {pastEvents.map((event) => (
            <div key={event.name} className="snap-start shrink-0 w-72">
              <EventCard event={event} />
            </div>
          ))}
        </div>

      </section>

      {/* About / FAQ */}
      <section
        id="about"
        className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
      >
        <div className="grid gap-12 md:grid-cols-[3fr,2fr] md:items-start">
          {/* About Content */}
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
              About UVic Hacks
            </h2>

            <p className="mt-4 text-sm text-cool-steel-200">
              UVic Hacks is a fully student-run hackathon club at the University of
              Victoria, officially registered with the UVSS. Our mission is to build
              a thriving community of builders, creators, designers, and developers
              who want to make cool things and push themselves beyond the classroom.
            </p>

            <p className="mt-3 text-sm text-cool-steel-200">
              We host hackathons, mini-sprints, workshops, and project nights where
              students of all skill levels can learn new technologies, meet teammates,
              and ship projects they’re proud of. Beginners are absolutely welcome—we
              structure our events so anyone can contribute meaningfully, even if
              they’ve never been to a hackathon before.
            </p>

            <p className="mt-3 text-sm text-cool-steel-200">
              Beyond running events on campus, one of our major goals is to assemble
              strong UVic teams and send them to external hackathons across Canada
              and beyond. We want to represent UVic at larger competitions, build
              connections with the wider tech community, and bring that momentum back
              home.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-xl font-display font-semibold tracking-tight md:text-2xl">
              Frequently Asked Questions
            </h3>

            <div className="mt-6 space-y-6 text-sm text-cool-steel-200">
              {/* Q1 */}
              <div>
                <p className="font-semibold text-cool-steel-100">
                  What is a hackathon?
                </p>
                <p className="mt-1 text-cool-steel-300">
                  A hackathon is a fast-paced event, usually 8 to 36 hours where teams
                  build a project from scratch. It can be software, hardware, art,
                  music, data science, or anything in between. You pick an idea,
                  learn what you need, build as much as you can, and then present it
                  at the end. It’s about creativity, collaboration, and learning by
                  doing.
                </p>
              </div>

              {/* Q2 */}
              <div>
                <p className="font-semibold text-cool-steel-100">
                  Do I need experience?
                </p>
                <p className="mt-1 text-cool-steel-300">
                  Not at all. Hackathons are one of the best ways to learn new skills
                  quickly, and most beginners walk away with something they never
                  thought they could build. We run beginner-friendly workshops and
                  help match you with teammates.
                </p>
              </div>

              {/* Q3 */}
              <div>
                <p className="font-semibold text-cool-steel-100">
                  How do teams work?
                </p>
                <p className="mt-1 text-cool-steel-300">
                  Teams typically have 2-4 members. You can join with friends, meet
                  people at the kickoff event, or match with others at team formation.
                  We emphasize collaboration over competition good teams are
                  supportive, curious, and open to trying new ideas.
                </p>
              </div>

              {/* Q4 */}
              <div>
                <p className="font-semibold text-cool-steel-100">
                  What if I don’t have an idea?
                </p>
                <p className="mt-1 text-cool-steel-300">
                  No problem. Most people show up with no idea at all. We’ll share
                  prompts, themes, and example challenges to help your team get
                  started. Inspiration usually hits once you start brainstorming.
                </p>
              </div>

              {/* Q5 */}
              <div>
                <p className="font-semibold text-cool-steel-100">
                  What does “representing UVic” mean?
                </p>
                <p className="mt-1 text-cool-steel-300">
                  As UVic Hacks grows, we’ll assemble high-performing teams and send
                  them to external hackathons. Think BC-wide, Canada-wide, or even
                  international events. Our goal is to build a culture of innovation
                  and put UVic on the map in the student tech scene.
                </p>
              </div>

              {/* Q6 */}
              <div>
                <p className="font-semibold text-cool-steel-100">
                  How do I join?
                </p>
                <p className="mt-1 text-cool-steel-300">
                  Just scroll up and click <span className="text-blue-300 font-medium">Join the Club</span>.
                  We’ll add you to our mailing list so you never miss an event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14"
      >
        <div className="rounded-2xl   bg-neutral-900/80 p-8 shadow-sm shadow-black/40">
          <h3 className="text-xl font-display font-semibold text-cool-steel-50">
            Any Questions?
          </h3>
          <p className="mt-2 text-sm text-cool-steel-200">
            Feel free to contact us with any inquiries you may have. We're always happy to talk about anything hackathon!
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="mailto:contact@uvichacks.com"
              className="rounded-full bg-goldenrod-500 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-yellow-900/50 transition hover:bg-goldenrod-400 hover:shadow-lg"
            >
              Email UVic Hacks
            </a>
            <a
              href="/join"
              className="text-sm font-medium text-cool-steel-200 underline-offset-4 hover:text-baltic-blue-300 hover:underline"
            >
              Join the club
            </a>
          </div>

          <p className="mt-3 text-xs text-cool-steel-500">
            You can also reach out on Discord or through any UVic Hacks organizer.
          </p>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-cool-steel-800 py-6 text-center text-xs text-cool-steel-500">
        <p>© {year} UVic Hacks. Built by students, for students.</p>
      </footer>
    </main>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={event.eventUrl ?? "/"}
      className="group flex h-full flex-col overflow-hidden rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 transition hover:border-baltic-blue-400 hover:bg-cool-steel-900"
    >
      {/* Thumbnail or gradient */}
      {event.imageUrl ? (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-baltic-blue-500 via-evergreen-500 to-goldenrod-500" />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-baltic-blue-300">
            {event.tag}
          </span>

          <span className="text-[11px] text-cool-steel-300">
            {event.date}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-display font-semibold text-cool-steel-50">
          {event.name}
        </h3>

        <p className="mt-1 text-xs text-cool-steel-300">
          {event.location}
        </p>

        <p className="mt-3 flex-1 text-sm text-cool-steel-200">
          {event.description}
        </p>

        {/* “View details” is now just styled text */}
        <span className="mt-4 text-xs font-semibold text-baltic-blue-300 underline-offset-4 transition group-hover:underline">
          View details
        </span>
      </div>
    </Link>
  );
}



function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm bg-neutral-900/80 shadow-sm shadow-black/40">
      {/* Preview area: project iframe where the image would be */}
      <div className="h-40 w-full overflow-hidden bg-cool-steel-900">
        {project.projectUrl ? (
          <iframe
            src={project.projectUrl}
            title={project.name}
            className="h-full w-full border-0"
            loading="lazy"
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-500 via-evergreen-500 to-gold-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-gold-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-300">
            Winner
          </span>
          <span className="text-[11px] text-cool-steel-300">
            {project.event}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-display font-semibold text-cool-steel-50">
            {project.name}
          </h3>
          <p className="mt-1 text-xs text-cool-steel-300">
            Team:{" "}
            <span className="font-medium text-cool-steel-100">
              {project.team}
            </span>
          </p>
        </div>

        <p className="text-sm text-cool-steel-200">{project.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-blue-300 underline-offset-4 hover:underline"
          >
            <span className="truncate max-w-[180px]">
              {project.projectUrl}
            </span>
            <span className="text-[10px] uppercase tracking-wide">
              Open
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
