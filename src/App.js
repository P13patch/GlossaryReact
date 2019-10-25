import React from 'react';
import Greeting from './components/Greeting'
import Glossary from './components/Glossary'
import './App.css';


export default function App() {
  let list = ["HTML - Hypertext Markup Language", "GML - general Markup Language", "TCP - Transmission Control Protocol", "DOM - Document Object Model", "IP - Internet Protocol"]
  return (
    <div className="App">
      <header className="App-header">
        <Greeting></Greeting>
        <Glossary className="glossary" lista={list}></Glossary>
      </header>
    </div>
  );
}


