import { Paragraph, Section, SectionSubtitle } from "@/app/blog/components/blog-section";

export default function TimeWallpaperChanger() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>A native Windows app that allows users to set a series of wallpapers with a timeframe for each. The app would automatically change wallpapers throughout the day based on the specified schedule.</Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>
        I liked the idea of using Tauri, as it would allow me to manage wallpaper changes using Rust. However, the main issue was that the Windows API for changing wallpapers was quite limited. It didn’t support specifying settings for
        multiple monitors or choosing between fill and fit options.
      </Paragraph>

      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>I'd like to give it another go and see if the issues are as bad as I remember.</Paragraph>
    </Section>
  );
}
