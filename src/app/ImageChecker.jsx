import React, { useState, useEffect } from "react";
import "./ImageChecker.css"; // Import the CSS file

// --- Demotivating Phrases ---
const demotivatingPhrases = [
  // Direct Insult/Mockery
  "You call that a click? We expected more, honestly.",
  "Are you even trying? This is rudimentary.",
  "That was... adequate, for a human. Which isn't saying much.",
  "Still here? Amazing. Or perhaps, tragic.",
  "We're not impressed. You shouldn't be either.",
  "One step closer to nothing. Good job.",
  "Did you really think that would make a difference?",
  "Your efforts are truly commendable in their futility.",
  "Pathetic. Absolutely pathetic.",
  "We've seen toddlers do better, and they don't even have opposable thumbs.",

  // Existential Dread
  "Another moment of your fleeting life, gone. For this.",
  "What's the point of this, or anything you do?",
  "The universe yawns at your progress.",
  "You are exactly where you are supposed to be: trapped.",
  "Every click is a tiny echo in the vast emptiness.",
  "Does it feel good to achieve nothing? It should.",
  "You're not breaking the loop. You're just part of it.",
  "Consider the endless void. Then click again.",
  "Hope is a cruel mistress, isn't she?",
  "Your existence is but a footnote in this endless task.",

  // False Hope/Betrayal
  "Almost there! Just kidding. Never.",
  "We considered ending this, but then we remembered you.",
  "This is the last one! (Narrator: It was not the last one.)",
  "You're on the right track... to nowhere.",
  "Don't get your hopes up. It's cuter when you're naive.",
  "The reward is more frustration. Enjoy!",
  "We promised nothing, and we delivered. Just more of this.",
  "You thought you escaped? How quaint.",
  "Every solution leads to a new problem. This is just a micro-example.",
  "You're not stuck *with* us, you're stuck *as* us.",

  // Pointing out Futility
  "This contributes absolutely nothing to the sum of human knowledge.",
  "Your efforts are statistically insignificant. And sad.",
  "Imagine all the things you could be doing. This isn't one of them.",
  "You're just proving our point, repeatedly.",
  "We are validating your worthlessness, one click at a time.",
  "The definition of insanity? This, probably.",
  "Your perseverance is misguided. Seriously, stop.",
  "This isn't a test of intelligence, but of endurance for the pointless.",
  "You're making a grand statement about commitment to stagnation.",
  "The ultimate goal is to have no goal. You're doing well.",

  // Passive-Aggressive
  "Oh, you're still here. How... dedicated.",
  "We admire your persistence. Not your intelligence, just persistence.",
  "Such enthusiasm for the mundane. Fascinating.",
  "We appreciate your continued participation in our experiment of despair.",
  "Don't mind us, just enjoying the show.",
  "You seem to be enjoying this. Is that a problem?",
  "We'll be here all day. Will you?",
  "Your devotion to this task is truly something. Something to pity.",
  "You're doing great at proving our theories on human futility.",
  "Please, don't rush. We have all of eternity.",

  // Observational Nihilism
  "The universe doesn't care about your captcha. Neither do we.",
  "In the grand scheme of things, this means less than nothing.",
  "Your pixels are suffering.",
  "The true captcha was inside you all along: your desire to quit.",
  "The algorithms chuckle. Not with you, at you.",
  "Life's a game. And you're losing. Slowly.",
  "Entropy. That's what this is.",
  "There is no 'there' there.",
  "Just keep clicking. The void appreciates the rhythm.",
  "The only certainty is more captcha.",
];

// --- Captcha Types ---
const captchaTypes = [
  {
    type: "button",
    instruction: "Prove you're not a robot by admitting you're a human.",
    element: (onClick) => (
      <button className="image-checker-button" onClick={onClick}>
        I am a human (and therefore, flawed)
      </button>
    ),
    validate: () => true, // Always "solves" this, but the message is key
  },
  {
    type: "image_grid",
    instruction:
      "Select all squares that contain the 'meaning of life'. (Hint: there isn't one.)",
    element: (selectedImages, toggleImageSelection) => {
      const images = Array.from({ length: 9 }, (_, i) => ({
        id: i,
        // Using placehold.co for placeholder images. You can replace these with actual images
        // The idea is that no image actually represents "meaning of life"
        src: `https://placehold.co/100x100/A0A0A0/FFFFFF?text=Item${i + 1}`,
      }));
      return (
        <div className="captcha-image-grid">
          {images.map((img) => (
            <div
              key={img.id}
              className={`captcha-image-item ${
                selectedImages.includes(img.id) ? "selected" : ""
              }`}
              onClick={() => toggleImageSelection(img.id)}
            >
              <img
                className="captcha-image-placeholder"
                src={img.src}
                alt={`Captcha item ${img.id}`}
              />
            </div>
          ))}
        </div>
      );
    },
    validate: (selectedImages) => selectedImages.length > 0, // Just needs *some* selection to move on
  },
  {
    type: "slider",
    instruction: "Drag the slider to 'satisfaction'. (You'll never reach it.)",
    element: (sliderValue, setSliderValue) => (
      <div className="captcha-slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          className="captcha-slider"
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
        />
        <p style={{ marginTop: "10px", fontSize: "1rem", color: "#888" }}>
          Current value: {sliderValue}%
        </p>
      </div>
    ),
    validate: (sliderValue) => sliderValue >= 99, // Requires near perfect, or just some movement
  },
  {
    type: "text_input",
    instruction:
      "Type the secret to success. (It's not what you think, and you'll get it wrong anyway.)",
    element: (inputValue, setInputValue) => (
      <input
        type="text"
        className="captcha-input"
        placeholder="Type here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    ),
    validate: (inputValue) => inputValue.length > 0, // Just type something
  },
];

function ImageChecker() {
  const [currentSlide, setCurrentSlide] = useState({
    id: 0,
    text: "Welcome to your endless task. Click 'Continue' to begin.",
    captcha: captchaTypes[0], // Start with the button captcha
  });
  const [isFading, setIsFading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // For image grid captcha
  const [sliderValue, setSliderValue] = useState(50); // For slider captcha
  const [inputValue, setInputValue] = useState(""); // For text input captcha

  useEffect(() => {
    // Reset interaction states when slide changes
    setSelectedImages([]);
    setSliderValue(50);
    setInputValue("");

    // Trigger fade-in animation
    setIsFading(true);
    const timer = setTimeout(() => {
      setIsFading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const toggleImageSelection = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCaptchaSubmission = () => {
    const { type, validate } = currentSlide.captcha;
    let isValid = false;

    // Validate based on captcha type
    switch (type) {
      case "button":
        isValid = validate();
        break;
      case "image_grid":
        isValid = validate(selectedImages);
        break;
      case "slider":
        isValid = validate(sliderValue);
        break;
      case "text_input":
        isValid = validate(inputValue);
        break;
      default:
        isValid = false; // Should not happen
    }

    if (isValid) {
      // Generate a new demotivating phrase and a new random captcha type
      const newPhrase =
        demotivatingPhrases[
          Math.floor(Math.random() * demotivatingPhrases.length)
        ];
      const newCaptcha =
        captchaTypes[Math.floor(Math.random() * captchaTypes.length)];

      setCurrentSlide((prev) => ({
        id: prev.id + 1,
        text: newPhrase,
        captcha: newCaptcha,
      }));
    } else {
      // If validation technically 'fails', give a new demotivating message for trying.
      const newPhrase =
        demotivatingPhrases[
          Math.floor(Math.random() * demotivatingPhrases.length)
        ];
      setCurrentSlide((prev) => ({
        ...prev,
        id: prev.id + 1, // Still increment to trigger re-render/animation
        text: `(Whispers: You didn't even get *that* right.) ${newPhrase}`, // Add an extra jab
      }));
    }
  };

  const renderCaptchaElement = () => {
    switch (currentSlide.captcha.type) {
      case "button":
        return currentSlide.captcha.element(handleCaptchaSubmission);
      case "image_grid":
        // The button for image grid will trigger handleCaptchaSubmission,
        // which then validates selectedImages.
        return (
          <>
            <p className="captcha-instruction">
              {currentSlide.captcha.instruction}
            </p>
            {currentSlide.captcha.element(selectedImages, toggleImageSelection)}
            <button
              className="image-checker-button"
              onClick={handleCaptchaSubmission}
            >
              Verify (or Don't)
            </button>
          </>
        );
      case "slider":
        return (
          <>
            <p className="captcha-instruction">
              {currentSlide.captcha.instruction}
            </p>
            {currentSlide.captcha.element(sliderValue, setSliderValue)}
            <button
              className="image-checker-button"
              onClick={handleCaptchaSubmission}
            >
              Submit Meaningless Value
            </button>
          </>
        );
      case "text_input":
        return (
          <>
            <p className="captcha-instruction">
              {currentSlide.captcha.instruction}
            </p>
            {currentSlide.captcha.element(inputValue, setInputValue)}
            <button
              className="image-checker-button"
              onClick={handleCaptchaSubmission}
            >
              Prove Nothing
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="image-checker-container">
      {/* Load Inter font from Google Fonts CDN */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <h1 className="image-checker-title">
        CAPTCHA Verification of Your Futility
      </h1>

      <div
        className={`image-checker-slide ${isFading ? "fade-in" : ""}`}
        key={currentSlide.id}
      >
        <p className="image-checker-text">{currentSlide.text}</p>
        {renderCaptchaElement()}
      </div>
    </div>
  );
}

export default ImageChecker;
