import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook
  const passwordRef= useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghjiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!~@#$%^&*()_+{}?>";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassowrdToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,16)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500 bg-gray-700">
        <h1 className=" text-white text-center my-3 "> Password Generator</h1>
        <div className=" flex shadow rounded-lg  mb-4  ">
          <input
            type="text"
            value={password}
            className=" rounded-lg outline-none w-full py-1 px-3 my-3"
            placeholder=" password"
            readOnly
            ref={passwordRef}

          />

          <button onClick={ copyPassowrdToClipboard} className="outline-none rounded-lg bg-blue-700 text-white px-3 h-8 mt-3 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor=""> Length:{length} </label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Special character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
