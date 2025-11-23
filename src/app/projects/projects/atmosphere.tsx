import { Project } from ".";

export const atmosphere: Project = {
  name: "atmosphere",
  links: [
    {
      url: "https://github.com/nandosobral03/atmosphere",
      name: "Github",
    },
  ],
  year: 2025,
  preview: {
    cover: "/covers/atmosphere.png",
    description: "A weather-aware desktop wallpaper scheduler built with Tauri and Rust. Automatically adapts your desktop background to current weather conditions and time of day.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Atmosphere is an intelligent wallpaper manager that brings the outside world to your desktop. Unlike standard slideshows or resource-heavy alternatives, it uses lightweight checks to synchronize your background with your actual
          environment.
          <br />
          <br />
          It monitors your local weather (rain, snow, sunshine) and time of day (dawn, dusk, late night) to seamlessly transition between wallpaper collections. The goal was to create something that feels "alive" without being intrusive—a
          small utility that sits in your tray and just works, giving your setup a cohesive mood that matches the day outside.
          <br />
          <br />
          The UI uses a modern aesthetic with a teal-accented palette, designed to look native and clean on Windows. It includes a full collections system, allowing users to create themes like "Cozy Cabin" or "Cyberpunk City" and map
          specific images to specific atmospheric conditions.
          <br />
          <br />
          I've been thinking of this idea for a while, something that I thought could be interesting with modern image generation models is to generate variations of the same image based on the weather conditions. So I thought why not build
          a wallpaper manager takes advantage of that? And with the release of the new nano banana pro model it felt like the perfect time to try it out.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          Built with <span className="font-semibold text-primary">Tauri</span> and <span className="font-semibold text-primary">Rust</span> for the backend, ensuring an incredibly small footprint (~5MB) compared to Electron alternatives.
          The frontend is <span className="font-semibold text-primary">React</span> with <span className="font-semibold text-primary">TypeScript</span> and <span className="font-semibold text-primary">Tailwind CSS</span>.
          <br />
          <br />
          State management is handled by <span className="font-semibold text-primary">Zustand</span>, with persistent local storage for user preferences. I used the <span className="font-semibold text-primary">WeatherAPI</span> to fetch
          real-time meteorological data, caching it intelligently to stay within free-tier limits while keeping data fresh.
          <br />
          <br />
          The core logic resides in Rust, which handles the system tray integration, file system operations, and the actual wallpaper changing mechanisms via Windows APIs.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          I wanted to revisit Tauri after some time away, and it’s refreshing to see how mature the ecosystem has become. One major takeaway was decision-making around data persistence.
          <br />
          <br />
          In previous Rust projects, I’d instinctively reach for a SQLite database or an embedded ORM, which often led to migration headaches and setup friction. For Atmosphere, I opted for a simple, strongly-typed JSON configuration file.
          This decision paid off immensely—it made backup/restore features trivial to implement (just zipping the config + images) and kept the architecture dead simple. Sometimes the "naive" solution is actually the robust one.
          <br />
          <br />I also initially prototyped an AI wallpaper generator within the app but decided to cut it. It was fun to build but ultimately distracted from the core "scheduler" value proposition. Learning to kill features to avoid scope
          creep is a skill I'm trying to practice more.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/atmosphere/1.png",
      alt: "Atmosphere main window showing active collection",
    },
    {
      url: "/projects/atmosphere/2.png",
      alt: "Collection manager interface",
    },
    {
      url: "/projects/atmosphere/3.png",
      alt: "System tray menu",
    },
    {
      url: "/projects/atmosphere/4.png",
      alt: "Settings and configuration",
    },
    {
      url: "/projects/atmosphere/5.png",
      alt: "Collection details view",
    },
    {
      url: "/projects/atmosphere/6.png",
      alt: "Full desktop showing dynamic wallpaper in action",
    },
  ],
};
