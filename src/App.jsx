import { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += '0123456789';
    if (isCharAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  },[length, isNumberAllowed, isCharAllowed]);

  const passwordRef = useRef(null);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);

  // Apply theme class to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={theme}>
      <div className={`flex justify-center items-center min-h-screen transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className={`w-full max-w-lg mx-auto shadow-md rounded-lg p-8 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Password Generator</h1>
            <button 
              onClick={toggleTheme} 
              className="text-2xl p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>

          <div className="flex shadow rounded-lg overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              className={`outline-none w-full py-2 px-3 ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
              }`}
              placeholder='Generated Password'
              ref={passwordRef}
              readOnly
            />
            <button
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 transition-colors'
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="cursor-pointer w-full accent-blue-500"
              />
              <label className="min-w-fit">Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={isNumberAllowed}
                onChange={() => setIsNumberAllowed(prev => !prev)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label>Numbers</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={isCharAllowed}
                onChange={() => setIsCharAllowed(prev => !prev)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label>Characters</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;