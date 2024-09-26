import React from 'react';
import './TicketCard.css';
import zero from '../photos/No-priority.svg';
import four from '../photos/SVG - Urgent Priority grey.svg';
import one from '../photos/Img - Low Priority.svg';
import two from '../photos/Img - Medium Priority.svg';
import three from '../photos/Img - High Priority.svg';
import todo from '../photos/To-do.svg';
import progress from '../photos/in-progress.svg';
import done from '../photos/Done.svg';
import cancel from '../photos/Cancelled.svg';
import backlog from '../photos/Backlog.svg';

const TicketCard = ({ ticket , groupby}) => {
  const { id, title, status, priority, tag } = ticket;
  console.log(groupby);

  return (
    <div className="ticket-card">

      <div className="image-container">
        <div className="placeholder-circle"></div>
        <div className="small-placeholder">
          {}
        </div>
      </div>

      <p style={{color:"gray",fontSize:'12px'}}>{id}</p>
  
        <p style={{display:'flex'}}>
          <span style={{marginRight:'4px',padding:'2px', display: groupby==="status"?'none':'' ,alignItems:'center', justifyContent:'center'}}>
        {status === "Todo" ? (
          <img src={todo} alt="" />
        ) : status === "In progress" ? (
          <img src={progress} alt="" />
        ) : status === "Backlog" ? (
          <img src={backlog} alt="" />
        ) : status === "Done" ? (
          <img src={done} alt="" />
        ) :
          <img src={cancel} alt="" />
        }
        </span>
        {title.length > 55 ? `${title.substring(0, 55)}...` : title}</p>


      
      <div className="ticket-tags">
        {groupby==='priority'?"": (priority === 0 ? (
          <img src={zero} alt="Priority Zero" />
        ) : priority === 1 ? (
          <img src={one} alt="Priority One" />
        ) : priority === 2 ? (
          <img src={two} alt="Priority Two" />
        ) : priority === 3 ? (
          <img src={three} alt="Priority Three" />
        ) :
          <img src={four} alt="Priority four" />
        )}
        {tag && tag.length > 0 ? (
          tag.map((t, index) => <span key={index} className="ticket-tag">
            <span className="tag-circle"></span>{t}</span>)
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
