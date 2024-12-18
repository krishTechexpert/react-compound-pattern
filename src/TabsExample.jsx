import React, { useState, createContext, useContext, memo, useCallback } from 'react';

const TabContext = createContext();

Tabs.Label = function Label({ children }) {
  return <div className="mt-10 text-2xl pb-5">{children}</div>;
};

Tabs.Header = function Header({ children }) {
  return <div className="flex gap-2">{children}</div>;
};

Tabs.TabItem = memo(function TabItem({ children, index }) {
  const { currentTab, handleTabs } = useContext(TabContext);
  
  return (
    <h2
      onClick={() => handleTabs(index)}
      className={`min-w-[100px] text-center p-2 text-2xl hover:bg-fuchsia-400 ${
        currentTab === index ? 'bg-fuchsia-400' : 'bg-gray-600'
      }`}
    >
      {children}
    </h2>
  );
});

Tabs.TabContentContainer = function TabContentContainer({children}){
  return     <div className='w-full border-cyan-300 px-2'>
      {children}
  </div>
}

Tabs.TabContent = function TabContent({ children,index }) {
  const {currentTab} =useContext(TabContext)
  return <div className={` ${currentTab === index ? 'block':'hidden'}`}>{children}</div>;
};


function Tabs({ children }) {
  const [currentTab, setCurrentTab] = useState(1);

  // Use useCallback to memoize the handleTabs function
  const handleTabs = useCallback((index) => {
    setCurrentTab(index);
  }, []);

  return (
    <TabContext.Provider value={{ currentTab, handleTabs }}>
      {children}
    </TabContext.Provider>
  );
}

export default function TabsExample() {
  return (
    <Tabs>
      <Tabs.Label>TabsExample | React Compound pattern</Tabs.Label>
      <Tabs.Header>
        <Tabs.TabItem index={1}>HTML</Tabs.TabItem>
        <Tabs.TabItem index={2}>CSS</Tabs.TabItem>
        <Tabs.TabItem index={3}>JavaScript</Tabs.TabItem>
      </Tabs.Header>
      <Tabs.TabContentContainer>
        <Tabs.TabContent index={1}>html description</Tabs.TabContent>
        <Tabs.TabContent index={2}>css description</Tabs.TabContent>
        <Tabs.TabContent index={3}>javascript description</Tabs.TabContent>
      </Tabs.TabContentContainer>
    </Tabs>
  );
}
