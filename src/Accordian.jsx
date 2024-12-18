import React, { useState } from 'react'

const FAQList = [
  {
  id:'p1',
  title:'html',
  desc:'HTML stands for Hypertext Markup Language, and is a code that defines the structure and meaning of content on a web page:'
},
{
  id:'p2',
  title:'css',
  desc:'CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.'
},
{
  id:'p3',
  title:'javascript',
  desc:'JavaScript (JS) is a programming language that developers use to create interactive web pages:'
}
]

export default function Accordian() {
  const [faqs,setFaqs]=useState(FAQList);
  const [current,setCurrent]=useState('p1')
  return <div className='mt-5 border border-cyan-300 p-4 w-[200px]'>
    <div className='text-2xl  pb-1 border-b-2 border-white mb-4'>Accordian</div>
    <ul>
      {faqs && faqs.map((faq) => (
        <li id={faq.id} className='py-2 border-b-2' key={faq.id}>
          <h2 onClick={() => setCurrent(faq.id)}>{faq.title}</h2>
          <article className={current === faq.id ? 'block' :'hidden'}>{faq.desc}</article>
        </li>
      ))}
    </ul>
    </div>
  
}

