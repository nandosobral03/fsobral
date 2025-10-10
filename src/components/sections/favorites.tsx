import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

interface FavoriteItem {
  title: string;
  author?: string;
  url?: string;
  description?: string;
}

const favorites = {
  blogs: [
    {
      title: "Write More Useless Software",
      author: "Nicole Tietz",
      url: "https://ntietz.com/blog/write-more-useless-software/",
    },
    {
      title: "High Agency",
      url: "https://www.highagency.com/",
      author: "George Mack",
    },
    {
      title: "How to Ship",
      author: "Sean Goedecke",
      url: "https://www.seangoedecke.com/how-to-ship",
    },
    {
      title: "You're Never the Intended Audience",
      author: "Adam Aleksic",
      url: "https://etymology.substack.com/p/youre-never-the-intended-audience?utm_source=%2Fbrowse%2Ftechnology&utm_medium=reader2",
    },
    {
      title: "I Will Fucking Piledrive You If You Mention AI Again",
      author: "Nikhil Suresh",
      url: "https://ludic.mataroa.blog/blog/i-will-fucking-piledrive-you-if-you-mention-ai-again/",
    },
    {
      title: "Hell Is Ourselves",
      url: "https://www.thenewatlantis.com/publications/hell-is-ourselves",
      author: "Laurence Scott",
    },
    {
      title: "A Brief History of Digital Gardens",
      author: "Maggie Appleton",
      url: "https://maggieappleton.com/garden-history",
    },
    {
      title: "JSX Over the Wire",
      author: "Dan Abramov",
      url: "https://overreacted.io/jsx-over-the-wire/",
    },
    {
      title: "Why null sucks",
      url: "https://blog.ihatereality.space/01-why-null-sucks/",
      author: "Waffle Lapkin",
    },
    {
      title: "PySkyWiFi: completely free, unbelievably stupid wi-fi on long-haul flights",
      author: "Robert Heaton",
      url: "https://robertheaton.com/pyskywifi/",
    },
    {
      title: "Systems design for advanced beginners",
      author: "Robert Heaton",
      url: "https://robertheaton.com/2020/04/06/systems-design-for-advanced-beginners/",
    },
    {
      title: "How to Generate Sudokus",
      author: "tn1ck",
      url: "https://tn1ck.com/blog/how-to-generate-sudokus",
    },
    {
      title: "Web Design in 4 minutes",
      author: "Jeremy Thomas",
      url: "https://jgthms.com/web-design-in-4-minutes/",
    },
    {
      title: "Build your own React",
      author: "Rodrigo Pombo",
      url: "https://pomb.us/build-your-own-react/",
    },
  ],
  books: [
    {
      title: "Consider the Lobster",
      author: "David Foster Wallace",
    },
    {
      title: "What I Talk About When I Talk About Running",
      author: "Haruki Murakami",
    },
    {
      title: "The Myth of Sisyphus",
      author: "Albert Camus",
    },
    {
      title: "House of Leaves",
      author: "Mark Z. Danielewski",
    },
    {
      title: "Stoner",
      author: "John Williams",
    },
    {
      title: "Huis Clos",
      author: "Jean-Paul Sartre",
    },
    {
      title: "Look Back",
      author: "Tatsuki Fujimoto",
    },
  ],
};

function FavoritesList({ items, eyebrow, headline }: { items: FavoriteItem[]; eyebrow: string; headline: string }) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-foreground/60">{eyebrow}</p>
        <h3 className="text-3xl font-bold uppercase font-condensed">{headline}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => {
          const number = String(index + 1).padStart(2, "0");
          const hasLink = Boolean(item.url);
          return (
            <li
              key={index}
              className="group flex items-start gap-5 border-[3px] border-foreground px-5 py-4 text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-within:bg-foreground focus-within:text-background"
            >
              <span className="font-condensed text-xs font-semibold uppercase tracking-[0.3em] text-accent pt-1">{number}</span>
              <div className="flex-1 space-y-2 transition-colors duration-200">
                {hasLink ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold underline decoration-dotted underline-offset-4 transition-colors duration-200 group-hover:decoration-background group-focus-within:decoration-background"
                  >
                    {item.title}
                  </a>
                ) : (
                  <div className="font-semibold">{item.title}</div>
                )}
                {item.author && <div className="text-sm opacity-75">by {item.author}</div>}
                {item.description && <p className="text-sm text-foreground/80">{item.description}</p>}
              </div>
              {hasLink && (
                <span className="material-symbols-outlined text-base opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-background group-focus-within:translate-x-1 group-focus-within:opacity-100 group-focus-within:text-background">
                  north_east
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Favorites() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <SectionTitle>Favorites</SectionTitle>
          <SectionDescription>Things I've read that stuck with me. Technical writing, philosophical pieces, and stories that changed how I see the world. Worth exploring more from these authors.</SectionDescription>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <FavoritesList items={favorites.blogs} eyebrow="blogs" headline="web finds" />
          <FavoritesList items={favorites.books} eyebrow="book" headline="selected prints" />
        </div>
      </div>
    </section>
  );
}
