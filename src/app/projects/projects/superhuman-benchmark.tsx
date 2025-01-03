import { Project } from ".";
import Link from "next/link";

export const superhumanBenchmark: Project = {
  name: "superhuman benchmark",
  links: [
    {
      url: "https://github.com/nandosobral03/superhuman-benchmark",
      name: "Github",
    },
  ],
  year: 2025,
  preview: {
    cover: "/covers/superhuman-benchmark.png",
    description:
      "Superhuman benchmark is a Python script with a command line interface designed to solve all tests available on Human Benchmark with 100% accuracy, demonstrating automation capabilities through natural browser interactions.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          This project is a collection of Python scripts designed to solve all tests available on{" "}
          <Link href="https://humanbenchmark.com/dashboard" className="underline text-accent" target="_blank">
            Human Benchmark
          </Link>{" "}
          with 100% accuracy. Each option of the menu corresponds to a specific test on the platform and is optimized to achieve the highest possible score.
          <br />
          <br />
          The project includes scripts for various cognitive tests including verbal memory, number memory, typing tests, visual memory, reaction time, aim training, chimp test, and sequence memory. All scripts interact with the webpage
          through mouse movements, clicks, and keyboard inputs - the same way a human would solve these tests, without modifying any webpage or game code.
          <br />
          <br />A main menu script allows users to easily select and run any of the tests, making it simple to demonstrate the automation capabilities across different cognitive challenges.
          <br />
          <br />
          This proyect was inspired by{" "}
          <Link href="https://www.youtube.com/watch?v=emMmkd-o2-o" className="underline text-accent" target="_blank">
            this video
          </Link>{" "}
          In which code bullet solves the aim training test. Felt that it would be cool to solve all of them with 100% accuracy and not hardcoding them to a px position like he does, instead taking a relative position after clicking on the
          start test button.
          <br />
          <br />
          Overall a fun weekend project that kinda came out of nowhere and I'm proud of the result.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          The project is built using Python with PyAutoGUI as the main automation library. Despite not having used Python in quite a while, PyAutoGUI immediately stood out as the perfect tool - its simple yet powerful API made it easy to
          get back into Python development while providing all the mouse and keyboard control functionality I needed.
          <br />
          <br />
          For text recognition, I used Tesseract OCR through the pytesseract wrapper. Even though I hadn't worked with OCR before, the Python ecosystem made it straightforward to integrate for reading numbers and words from the screen
          during tests.
          <br />
          <br />
          PyAutoGUI's screenshot capabilities combined with basic image processing were perfect for identifying clickable elements and tracking visual changes. The library's fail-safes also helped prevent any runaway automation scripts by
          detecting mouse movement to corners - a feature I really appreciated while getting reacquainted with automation tools.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project provided valuable insights into browser automation and image processing. I learned how to effectively combine different automation techniques to create robust solutions that can handle various types of cognitive
          tests.
          <br />
          <br />
          Understanding how to process screen information in real-time and optimizing for speed was particularly challenging and educational since the tests are timed and the user has a limited amount of time to solve them.
          <br />
          <br />
          Additionally, I gained experience in creating user-friendly CLI tools which I always had in the back of my mind but never got the chance to implement.
          <br />
          <br />
          Some scripts are not flawless but work most of the time which is good enough for the purpose of this project.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          While the project successfully achieves its goals, there are several areas where I would make improvements if starting over, for example, I would implement better error handling and recovery mechanisms for cases where the website
          layout changes or network issues occur. Additionally, creating a more sophisticated logging system would help in debugging and performance optimization.
          <br />
          <br />I would also consider "training" tesseract on the particular font used in the tests, since the number memory test sometimes fails to read the numbers.
          <br />
          <br />
          Also making it easier to close, pause and resume the script from arbitrary points.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/superhuman-benchmark/1.png",
      alt: "Test Results Dashboard",
    },
    {
      url: "/projects/superhuman-benchmark/2.png",
      alt: "Script Execution Interface",
    },
    {
      url: "/projects/superhuman-benchmark/3.png",
      alt: "Example of prompt before running the script",
    },
  ],
};
