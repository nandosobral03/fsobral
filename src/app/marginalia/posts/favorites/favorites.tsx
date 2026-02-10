import { Section } from "@/app/blog/components/blog-section";
import TLDR from "@/app/blog/components/TLDR";

interface FavoriteItem {
  title: string;
  author?: string;
  url?: string;
}

const webFinds: FavoriteItem[] = [
  { title: "Write More Useless Software", author: "Nicole Tietz", url: "https://ntietz.com/blog/write-more-useless-software/" },
  { title: "High Agency", author: "George Mack", url: "https://www.highagency.com/" },
  { title: "How to Ship", author: "Sean Goedecke", url: "https://www.seangoedecke.com/how-to-ship" },
  { title: "You're Never the Intended Audience", author: "Adam Aleksic", url: "https://etymology.substack.com/p/youre-never-the-intended-audience" },
  { title: "I Will Fucking Piledrive You If You Mention AI Again", author: "Nikhil Suresh", url: "https://ludic.mataroa.blog/blog/i-will-fucking-piledrive-you-if-you-mention-ai-again/" },
  { title: "Hell Is Ourselves", author: "Laurence Scott", url: "https://www.thenewatlantis.com/publications/hell-is-ourselves" },
  { title: "A Brief History of Digital Gardens", author: "Maggie Appleton", url: "https://maggieappleton.com/garden-history" },
  { title: "JSX Over the Wire", author: "Dan Abramov", url: "https://overreacted.io/jsx-over-the-wire/" },
  { title: "Why null sucks", author: "Waffle Lapkin", url: "https://blog.ihatereality.space/01-why-null-sucks/" },
  { title: "PySkyWiFi: completely free, unbelievably stupid wi-fi on long-haul flights", author: "Robert Heaton", url: "https://robertheaton.com/pyskywifi/" },
  { title: "Systems design for advanced beginners", author: "Robert Heaton", url: "https://robertheaton.com/2020/04/06/systems-design-for-advanced-beginners/" },
  { title: "How to Generate Sudokus", author: "tn1ck", url: "https://tn1ck.com/blog/how-to-generate-sudokus" },
  { title: "Web Design in 4 minutes", author: "Jeremy Thomas", url: "https://jgthms.com/web-design-in-4-minutes/" },
  { title: "Build your own React", author: "Rodrigo Pombo", url: "https://pomb.us/build-your-own-react/" },
];

const selectedPrints: FavoriteItem[] = [
  { title: "Consider the Lobster", author: "David Foster Wallace" },
  { title: "What I Talk About When I Talk About Running", author: "Haruki Murakami" },
  { title: "The Myth of Sisyphus", author: "Albert Camus" },
  { title: "House of Leaves", author: "Mark Z. Danielewski" },
  { title: "Stoner", author: "John Williams" },
  { title: "Huis Clos", author: "Jean-Paul Sartre" },
  { title: "Look Back", author: "Tatsuki Fujimoto" },
];

function FavoritesListTitle({ children, count }: { children: React.ReactNode; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px bg-accent" />
      <h3 className="text-xs font-condensed uppercase tracking-[0.2em] text-foreground/70">{children}</h3>
      <span className="meta-label text-accent/50">{count}</span>
    </div>
  );
}

function FavoritesList({ items }: { items: FavoriteItem[] }) {
  return (
    <ol className="space-y-0">
      {items.map((item, index) => {
        const num = String(index + 1).padStart(2, "0");
        return (
          <li key={index} className="group flex items-baseline gap-4 py-2 hover:bg-foreground/[0.02] transition-all -mx-2 px-2 border-l-2 border-transparent hover:border-accent">
            <span className="font-serif text-base text-accent/50 tabular-nums select-none group-hover:text-accent transition-colors">{num}</span>
            <div className="flex-1 min-w-0">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {item.title}
                </a>
              ) : (
                <span>{item.title}</span>
              )}
              {item.author && <span className="text-sm text-foreground/50 ml-2 italic font-serif">{item.author}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Favorites() {
  return (
    <Section>
      <TLDR customTitle="What?">These are some of my favorite blogs, books, and other things that made a lasting impression.</TLDR>
      <div className="grid gap-12 md:grid-cols-2 mt-8">
        <div>
          <FavoritesListTitle count={webFinds.length}>Web Finds</FavoritesListTitle>
          <FavoritesList items={webFinds} />
        </div>
        <div>
          <FavoritesListTitle count={selectedPrints.length}>Selected Prints</FavoritesListTitle>
          <FavoritesList items={selectedPrints} />
        </div>
      </div>
    </Section>
  );
}
