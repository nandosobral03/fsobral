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

function FavoritesList({ items, type }: { items: FavoriteItem[]; type: string }) {
  return (
    <section className="w-1/2 p-6 flex flex-col gap-4">
      <h3 className="text-3xl font-bold uppercase tracking-wide font-condensed">{type}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="space-y-1 flex gap-3">
            <span className="text-foreground opacity-50 font-bold">|</span>
            <div className="flex-1 space-y-1">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block font-medium hover:underline">
                  {item.title}
                </a>
              ) : (
                <div className="font-medium">{item.title}</div>
              )}
              {item.author && <div className="text-sm opacity-75">by {item.author}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Favorites() {
  return (
    <>
      <div className="w-full p-6">
        <SectionTitle>Favorites</SectionTitle>
        <SectionDescription>Things I've read that stuck with me. Technical writing, philosophical pieces, and stories that changed how I see the world. Worth exploring more from these authors.</SectionDescription>
      </div>
      <div className="w-full flex items-stretch border-t-[3px] border-foreground">
        <FavoritesList items={favorites.blogs} type="blogs" />
        <div className="w-[3px] bg-foreground"></div>
        <FavoritesList items={favorites.books} type="books" />
      </div>
    </>
  );
}
