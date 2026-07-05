import Hero from "../components/Hero";
import LoveStory from "../components/LoveStory";
import Countdown from "../components/Countdown";
import Venue from "../components/Venue";
import RSVP from "../components/RSVP";
import Particles from "../components/Particles";

export default function Page() {
  return (
    <>
      <div className="bg" />
      <Particles />
      <Hero />
      <Countdown />
      <LoveStory />
      <Venue />
      <RSVP />
    </>
  );
}
