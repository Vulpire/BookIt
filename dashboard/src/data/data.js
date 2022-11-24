import React from 'react';
import { AiOutlineCalendar, AiOutlineUsergroupAdd, AiOutlineTeam } from 'react-icons/ai';


export const plinks = [
    {
      title: 'Dashboard',
      links: [
        {
            name: 'calendar',
            icon: <AiOutlineCalendar />,
        },
      ],
    },
  
    {
      title: 'Groups',
      links: [
        {
          name: 'create group',
          icon: <AiOutlineUsergroupAdd />,
        },
        {
          name: 'view groups',
          icon: <AiOutlineTeam />,
        },
      ],
    },
  ];