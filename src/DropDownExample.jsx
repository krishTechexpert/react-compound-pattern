import React from 'react';
import { FiCheck, FiChevronDown } from "react-icons/fi";
import {useState,useRef,createContext, Children,useContext} from 'react';

import useClickOutside from './useClickOutside';

const usersArray = [
  {
    name: "Miguel",
    imgUrl: "/assets/user-1.svg",
    id: "M1",
  },
  {
    name: "Jane",
    imgUrl: "/assets/user-2.svg",
    id: "J2",
  },
  {
    name: "Paul",
    imgUrl: "/assets/user-3.svg",
    id: "P3",
  },
  {
    name: "Abbey",
    imgUrl: "/assets/user-4.svg",
    id: "A4",
  },
  {
    name: "Chad",
    imgUrl: "/assets/user-5.svg",
    id: "C5",
  },
  {
    name: "Fiona",
    imgUrl: "/assets/user-6.svg",
    id: "F6",
  },
  {
    name: "Andreas",
    imgUrl: "/assets/user-7.svg",
    id: "A7",
  },
  {
    name: "Jane",
    imgUrl: "/assets/user-8.svg",
    id: "J8",
  },
];

const DropDownContext = createContext();


function DropDown({children}){
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [assignedList, setAssignedList] = useState([]);

  const dropdownContainerRef = useRef(null);

  useClickOutside(dropdownContainerRef, () => {
    setIsDropdownOpen(false);
  });
  return (
  <DropDownContext.Provider value={{isDropdownOpen,setIsDropdownOpen,assignedList,setAssignedList}}>
    {/* // click outside ref={dropdownContainerRef} from this div */}

      <div className=" w-[300px] relative" ref={dropdownContainerRef}>
        {children}
      </div>
    
  </DropDownContext.Provider>
  )
}

DropDown.Label = function Label({children}){
  return <h1 className="text-2xl ">{children} </h1>
}

DropDown.Button = function Button({children}){
  const {setIsDropdownOpen} = useContext(DropDownContext)
  return <button onClick={() => setIsDropdownOpen(true)}  className="px-4 py-2 w-full flex items-center justify-between rounded border border-[#828FA340] hover:border-primary cursor-pointer relative">
        <span className='block'> 
          <FiChevronDown color="#635FC7" size={24} />
        </span>{children}
  </button>
}

DropDown.OptionList = function OptionList({usersArray}){
  const {isDropdownOpen,setIsDropdownOpen,assignedList,setAssignedList} = useContext(DropDownContext)
  function handleAssign(user) {
    setAssignedList((prevList) => {
      // Check if the user already exists in the list
      if (prevList.includes(user)) {// check object reference
        // If user exists, remove it from the list (because both are pointing to same memory location)
        const updatedList = prevList.filter((item) => item !== user); // yha per bi user ka reference check ho reha hai..and compare with item
        return updatedList;
      } else {
        // If user doesn't exist, add it to the list
        return [...prevList, user];
      }
    });
  }
  return (
    isDropdownOpen && <div className="absolute bottom-full translate-x-9  left-full translate-y-full rounded bg-[#20212c] w-max">
      <DropDown.Closed onClose={() => setIsDropdownOpen(false)} />
      <ul className="flex flex-col p-2">
              {usersArray.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center gap-2 p-4 hover:bg-[#2b2c37] rounded transition-all duration-200 `}
                  onClick={() => handleAssign(user)}
                  >
                    {assignedList.includes(user) && <FiCheck />}
                  <img
                    className="w-6 h-6 "
                    src={user.imgUrl}
                    alt={`${user.name} image`}
                  />
                  <span>{user.name}</span>
                </li>
              ))}
      </ul>
    </div>
  )
}

DropDown.Closed = function Closed({ onClose }) {
  return (
    <div
      className="absolute top-0 right-0 w-full flex items-center justify-center -translate-y-full gap-2 bg-[#C0392B] px-2 py-1 rounded-t"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <span>close</span>
      <span>X</span>
    </div>
  );
};



DropDown.AssignList = function AssignList(){
  const {assignedList,setAssignedList} = useContext(DropDownContext)

  function handleRemove(user) {
    setAssignedList((prevUser) => {
      return prevUser.filter(u => u.id !== user.id)
    })
  }


  return (

    assignedList.length>0 ? 

     <div className="mt-4 p-2 shadow-sm bg-[#828fa318] rounded">
      <h2 className="px-2 my-3 font-bold">Assigned list:</h2>
      <div className="flex flex-wrap gap-4 ">
        {assignedList?.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-1 w-[47.5%] p-2 hover:bg-[#20212c] rounded transition-all duration-200">
            <span>{index + 1}.</span>
            <img
              className="w-6 h-6 "
              src={user.imgUrl}
              alt={`${user.name} image`}
            />

            <span>{user.name}</span>
            <span  onClick={() => handleRemove(user)} className="ml-auto cursor-pointer p-1 hover:bg-[#2b2c37] rounded-full">
              X
            </span>
          </div>
        ))}
      </div>
    </div> : <p className="mt-4 p-2 shadow-sm bg-[#828fa318] rounded">
              No users assigned to the task yet.
          </p>
  );

}


export default function DropDownExample() {
  return (
    <DropDown>
          <DropDown.Label>React Compound Pattern | Dropdown</DropDown.Label>
          <DropDown.Button/>
          <DropDown.OptionList usersArray={usersArray} />
          <DropDown.AssignList />
    </DropDown>
  )
}
