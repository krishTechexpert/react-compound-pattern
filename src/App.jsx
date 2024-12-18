import Accordian from "./Accordian";
import DropDownExample from "./DropDownExample";
import TabsExample from "./TabsExample";

export default function App() {

  return (
      <div className="bg-[#2b2c37] text-white flex  p-20 gap-4 items-center flex-col">
        <DropDownExample />
        <TabsExample/>
        <Accordian/>
    </div>
    
    );
}

