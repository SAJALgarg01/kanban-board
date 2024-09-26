import React from 'react';
import TicketCard from './TicketCard';
import add from "../photos/add.svg";
import dots from "../photos/3 dot menu.svg";
import zero from '../photos/No-priority.svg';
import one from '../photos/Img - Low Priority.svg';
import two from '../photos/Img - Medium Priority.svg';
import three from '../photos/Img - High Priority.svg';
import four from '../photos/SVG - Urgent Priority colour.svg';
import todo from '../photos/To-do.svg';
import progress from '../photos/in-progress.svg';
import done from '../photos/Done.svg';
import cancel from '../photos/Cancelled.svg';
import backlog from '../photos/Backlog.svg';

const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
        const groupKey = ticket[groupBy];
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(ticket);
        return groups;
    }, {});
};

const sortTickets = (tickets, sortBy) => {
    return [...tickets].sort((a, b) => {
        if (sortBy === 'priority') {
            return b.priority - a.priority;
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });
};

const prior= {
    '0':'No priority',
    '1': 'Low',
    '2': 'Medium',
    '3': 'High',
    '4': 'Urgent'
}
const KanbanBoard = ({ tickets, groupBy, sortBy, users }) => {
    const userMap = users.reduce((map, user) => {
        map[user.id] = user.name;
        return map;
      }, {});
      
    const groupedTickets = groupTickets(tickets, groupBy);

    if (groupBy === 'status') {
        if (!groupedTickets["Done"]) {
            groupedTickets["Done"] = [];
        }
        if (!groupedTickets["Cancelled"]) {
            groupedTickets["Cancelled"] = [];
        }
    }
    console.log('grouptickets',groupedTickets);
    const sortedGroups = Object.keys(groupedTickets).map((groupKey) => ({
        groupKey,
        tickets: sortTickets(groupedTickets[groupKey], sortBy),
    }));
    console.log(sortedGroups);

    return (
        <div className="kanban-board">
            {sortedGroups.map((group) => (
                <div className="kanban-column" key={group.groupKey}>
                    {/* <span>{group.groupKey} {group.tickets.length}</span> */}
                    <div className="kanban-column-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , marginBottom:'8px'}}>
                        <span style={{display:'flex', alignItems:'center'}}>
                            {group.groupKey === 'Todo'?<img src={todo} alt="" />:
                            group.groupKey === 'In progress'?<img src={progress} alt="" />:
                            group.groupKey === 'Done'?<img src={done} alt="" />:
                            group.groupKey === 'Backlog'?<img src={backlog} alt="" />:
                            group.groupKey === 'Cancelled'?<img src={cancel} alt="" />:
                            group.groupKey === '0'?<img src={zero} alt="" />:
                            group.groupKey === '1'?<img src={one} alt="" />:
                            group.groupKey === '2'?<img src={two} alt="" />:
                            group.groupKey === '3'?<img src={three} alt="" />:
                            group.groupKey === '4'?<img src={four} alt="" />:
                            group.groupKey.startsWith("usr")?<span className="user-image-placeholder"><span className="user-small-image-placeholder"></span></span>
                            :''}
                        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{
                        groupBy==='priority'?prior[group.groupKey]:groupBy==='userId'?userMap[group.groupKey]:group.groupKey}</span>
                        </span>
                        
                        <span style={{ marginLeft: '8px', color: 'gray' }}>{group.tickets.length}</span>
                        <span style={{ display: 'flex' }}>
                            <img src={add} alt="" />
                            <img src={dots} alt="" />
                        </span>
                    </div>
                    {group.tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} groupby={groupBy} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
