import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  
  // Demo styles, see 'Styles' section below for some notes on use.
  import 'react-accessible-accordion/dist/fancy-example.css';
const Accordion = () => {
return (
    <div> <Accordion>
    <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton>
                What harsh truths do you prefer to ignore?
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
        <>
                { title!= "Miscellaneous" &&
                <li key={1}><Link to={ `../vision-doc/${data}`}>
                  <div className='flex flex-row'>
                  <img src={visionDocIcon} alt="Vision doc icon" className="h-4 w-4 mr-2 mt-1" />
                  Vision Doc
                  </div>
                  </Link></li>
                }
                <li key={2}><Link to={ `../research/${data}`}>
                  <div className='flex flex-row'>
                  <img src={researchIcon} alt="Research bank icon" className="h-4 w-4 mr-2 mt-1" />
                  Research Bank
                  </div>
                  </Link></li>
                </>
        </AccordionItemPanel>
    </AccordionItem>
    <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton>
                Is free will real or just an illusion?
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
            <p>
                In ad velit in ex nostrud dolore cupidatat consectetur
                ea in ut nostrud velit in irure cillum tempor laboris
                sed adipisicing eu esse duis nulla non.
            </p>
        </AccordionItemPanel>
    </AccordionItem>
</Accordion></div>
)
}

export default Accordion