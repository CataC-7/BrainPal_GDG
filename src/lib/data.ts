export type Routine = {
  id: string;
  title: string;
  steps: string[];
  category:
    | 'morning'
    | 'flow'
    | 'night'
    | 'emergency'
    | 'boredom'
    | 'rerouting';
};

export const dailyWorkflows: Routine[] = [
  {
    id: 'dwf-morning',
    title: 'Morning Routine',
    steps: [
      'Breakfast',
      'Meditation',
      'Movement',
      'Online Learning',
    ],
    category: 'morning',
  },
  {
    id: 'dwf-flow',
    title: "Today's Flow",
    steps: ["This is your day's flow. Edit it to make it your own."],
    category: 'flow',
  },
  {
    id: 'dwf-night',
    title: 'Night Routine',
    steps: [
      'Friend Replies',
      'Physio',
      'Journal',
      'Stretch',
      'Go to Sleep',
    ],
    category: 'night',
  },
];

export const protocols: Routine[] = [
  {
    id: 'p-emergency',
    title: 'Emergency Protocol',
    steps: ['This is your emergency protocol. Edit it to make it your own.'],
    category: 'emergency',
  },
  {
    id: 'p-boredom',
    title: 'Boredom Protocol',
    steps: ['This is your boredom protocol. Edit it to make it your own.'],
    category: 'boredom',
  },
  {
    id: 'p-rerouting',
    title: 'Re-routing Protocol',
    steps: ['This is your re-routing protocol. Edit it to make it your own.'],
    category: 'rerouting',
  },
];