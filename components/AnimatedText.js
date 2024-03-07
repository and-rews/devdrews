import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const AnimatedText = () => {
  return (
    <div className="typewriter">
      <Typewriter
        options={{
          strings: [
            "Welcome to my digital playground!",
            "I’m a hacker by night, a web developer by day, and a perpetual learner.",
            "In the matrix of ones and zeros, I weave my digital tapestry.",
            "From hacking security loopholes to crafting pixel-perfect designs",
            "This is my corner of the web.",
            "Explore my projects, read my blog, and let’s connect!",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default AnimatedText;
