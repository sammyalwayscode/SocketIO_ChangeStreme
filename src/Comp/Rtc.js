import { useRef, useState } from "react";

const Rtc = () => {
  const myRef = useRef(0);
  const [state, setState] = useState(0);
  console.log((myRef.current = state));
  //   console.log((myRef.current.style.color = "red"));
  const onChange = () => {};
  return (
    <center>
      <div ref={myRef}>Run RTC</div>
      <div>State: {state}</div>
    </center>
  );
};

export default Rtc;
