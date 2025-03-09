import React, { useState } from 'react';
import Quotes from './Data/Quotes.jsx';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { RxCopy } from "react-icons/rx";
import { RxSpeakerLoud, RxSpeakerOff, RxInstagramLogo } from "react-icons/rx";
import { RiLinkedinFill, RiInstagramLine, RiGithubFill } from "react-icons/ri";
import { MdCloseFullscreen } from "react-icons/md";

const App = () => {
  const [imagetoggle, setImageToggle] = useState(false);
  const [quote, setQuote] = useState({ text: '', author: '', category: '', });
  const [toggle, setToggle] = useState(false);
  const [copied, setCopied] = useState(false);

  const getRandomQuote = () => {
    const categories = Object.keys(Quotes);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomIndex = Math.floor(Math.random() * Quotes[randomCategory].length);
    const randomQuote = Quotes[randomCategory][randomIndex];
    setQuote({ ...randomQuote, category: randomCategory });
  };

  const speakQuote = (text, author) => {
    console.log("Speaking text:", text);
    const speech = new SpeechSynthesisUtterance(`'${text}' by ${author}`);
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    speech.onend = () => {
      console.log("Speech finished");
      setToggle(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const handleSpeechToggle = () => {
    setToggle((prevToggle) => {
      const newToggle = !prevToggle;
      if (newToggle) {
        console.log("Speaking:", quote.text);
        speakQuote(quote.text, quote.author);
      } else {
        console.log("Speech stopped");
        window.speechSynthesis.cancel();
      }
      return newToggle;
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote.text)
      .then(() => {
        console.log('Quote copied to clipboard!');
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };

  const Buttons = [
    {
      id: 1,
      name: "Speaker",
      action: handleSpeechToggle,
      icon: toggle ? <RxSpeakerLoud /> : <RxSpeakerOff />,
      title: toggle ? "Loud" : "Muted"
    },
    {
      id: 2,
      name: "Copy",
      action: copyToClipboard,
      icon: <RxCopy />,
      title: "Copy Quote"
    },
    {
      id: 3,
      name: "Instagram",
      action: () => window.location.href = "https://www.instagram.com/ibrahimvert19/",
      icon: <RxInstagramLogo />,
      title: "Instagram"
    },
  ];

  const Icons = [
    {
      id: 1,
      name: "LinkedIn",
      link: () => window.location.href = "https://www.linkedin.com/in/ibrahim-adjei-038552339/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpAqvAPS%2BRQSiBhtCGNtNDA%3D%3D",
      icon: <RiLinkedinFill />,
    },
    {
      id: 2,
      name: "Instagram",
      link: () => window.location.href = "https://www.instagram.com/ibrahimvert19/",
      icon: <RiInstagramLine />,
    },
    {
      id: 3,
      name: "Github",
      link: () => window.location.href = "https://github.com/ibhimwhar",
      icon: <RiGithubFill />,
    },
  ]

  const HandleToggleZoomMode = () => {
    setImageToggle(!imagetoggle)
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-blue-500 text-white p-5">

      {copied && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 md:p-4 p-2 bg-green-500 text-white rounded-lg shadow-lg opacity-100 transition-all duration-700 ease-in-out">
          <p className='text-sm text-center'>Quote copied to clipboard!</p>
        </div>
      )}

      {imagetoggle && (
        <div onClick={HandleToggleZoomMode} className='z-50 cursor-zoom-out fixed bg-black/90 flex justify-center items-center w-full h-[100vh]'>
          <div className='relative cursor-auto md:w-90 pb-2 rounded-lg overflow-hidden bg-yellow-500'>
            <button onClick={HandleToggleZoomMode} className='absolute z-50 right-2 top-2 cursor-pointer transition-all duration-300 opacity-75 hover:opacity-100 hover:scale-110'>
              <MdCloseFullscreen size={20} />
            </button>
            {quote.image && (
              <img src={quote.image} alt={quote.author} className="w-60 md:w-full h-full object-cover" />
            )}

            <div className='absolute grid bottom-3 right-1 text-right space-y-2 '>
              {Icons.map((icon) => (
                <button
                  key={icon.id}
                  title={icon.name}
                  onClick={icon.link}
                  className='cursor-pointer text-xl transition-all duration-300 opacity-75 hover:opacity-100 hover:scale-110 '
                >
                  {icon.icon}
                </button>
              ))}
            </div>


          </div>
        </div>
      )}

      <h1 className="text-3xl text-center font-bold mb-5 ">Random Quote Generator</h1>

      <div className="bg-white text-black p-5 rounded-lg shadow-md transition-opacity duration-500">
        <h2 className="text-xl font-semibold">{quote.category ? quote.category.charAt(0).toUpperCase() + quote.category.slice(1) : "Quote"}</h2>

        <p className="mt-2 flex text-justify md:text-left">
          <span className='pr-2 text-yellow-500'>
            <RiDoubleQuotesL />
          </span>
          {quote.text}
          <span className='pl-2 text-yellow-500'>
            <RiDoubleQuotesR />
          </span>
        </p>

        <div className="mt-2 flex justify-between">

          <div onClick={HandleToggleZoomMode} className='w-12 cursor-zoom-in hover:scale-110 transition-all duration-300'>
            {quote.image && (
              <img src={quote.image} alt={quote.author} className="w-full h-12 object-cover rounded-full" />
            )}
          </div>

          <div className='flex text-black items-center justify-center relative'>
            <span className='absolute -left-7 w-5 h-[1px] bg-black/50 opacity-50' />
            <h1 className='italic'>{quote.author || "Unknown Author"}</h1>
          </div>
        </div>

        <hr className='border-0 bg-black/50 opacity-50 h-[1px] m-5 mt-7' />

        <div className='flex items-baseline justify-between'>
          <div className='flex gap-5'>
            {Buttons.map((button) => (
              <button
                key={button.id}
                title={button.title}
                onClick={button.action}
                className="border p-2 relative flex items-center justify-center transition duration-300 cursor-pointer border-blue-500 text-blue-500 w-fit rounded-full 
               hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-lg"
              >
                {button.icon}
              </button>
            ))}
          </div>
          <h4 className='text-black/50 opacity-50 text-[10px] pr-13 relative'>By <span className='text-[14px] right-0 animate-bounce duration-700 absolute'>Ibrahim</span></h4>
        </div>
      </div>

      <button
        onClick={getRandomQuote}
        className="mt-5 px-5 py-3 cursor-pointer bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Get New Quote
      </button>

    </main>
  );
};

export default App;
