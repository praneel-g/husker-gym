import { getGym, getGyms } from "@/db/functions";
import clsx from "clsx";
import { Navbar } from "./components/Navbar";
import { SectionSummary } from "./components/SectionSummary";
import { ComponentProps } from "react";

export const revalidate = 0; // no cache

export default async function HomePage() {
  const gyms = await getGyms();
  // return <div className="p-5">Under maintenance – Please come back later!</div>
  const marino = await getGym("marino");
  const squash = await getGym("squashbusters");
  // const cabot = await getGym("cabot");

  return (
    <>
      <Navbar />
      <main className="max-w-[60ch] mx-auto p-5 pt-4 space-y-6">
        <Gym gym={marino} />
        <Gym gym={squash} />
        {/* <Gym gym={cabot} /> */}
      </main>
    </>
  );
}

interface GymProps extends ComponentProps<"section"> {
  closedMessage?: string;
  gym: Awaited<ReturnType<typeof getGym>>;
}
function Gym({ closedMessage, gym, className }: GymProps) {
  return (
    <section className={className}>
      <h2 className="font-bold text-xl -mb-2">{gym?.name}</h2>
      {closedMessage ? (
        <section
          style={{
            background: `repeating-linear-gradient(
            45deg,
            #422006 0px,
            #422006 20px,
            #111111 20px,
            #111111 40px
          )`,
          }}
          className="mt-3 rounded-xl  text-gray-200 font-bold flex items-center justify-center h-32"
        >
          {closedMessage}
        </section>
      ) : (
        <div>
          {gym?.sections.map((section, index) => (
            // A top border after the margin, as divide-y drew it in Tailwind 3
            // (Tailwind 4's divide-y puts a bottom border before the margin).
            <div key={section.id} className="mt-2 py-2 border-t first:border-t-0 dark:border-gray-800">
              <SectionSummary slug={section.slug} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
