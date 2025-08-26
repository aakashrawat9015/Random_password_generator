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

  const passwordGenerator = () => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += '0123456789';
    if (isCharAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'dark'}`}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div className="w-full max-w-lg mx-auto shadow-md rounded-lg p-8 bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-500">
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Password Generator</h1>
            <button onClick={toggleTheme} className="text-2xl">
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>

          <div className="flex shadow rounded-lg overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              placeholder='Generated Password'
              readOnly
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
              
                className="cursor-pointer w-full accent-blue-500"
              />
              <label className="min-w-fit">Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={isNumberAllowed}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label>Numbers</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={isCharAllowed}
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