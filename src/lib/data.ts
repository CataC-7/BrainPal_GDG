export type Step = {
  text: string;
  completed: boolean;
};

export type Routine = {
  id: string;
  title: string;
  steps: Step[];
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
      { text: 'Breakfast', completed: false },
      { text: 'Meditation', completed: false },
      { text: 'Movement', completed: false },
      { text: 'Online Learning', completed: false },
    ],
    category: 'morning',
  },
  {
    id: 'dwf-flow',
    title: "Today's Flow",
    steps: [{ text: "This is your day's flow. Edit it to make it your own.", completed: false }],
    category: 'flow',
  },
  {
    id: 'dwf-night',
    title: 'Night Routine',
    steps: [
      { text: 'Friend Replies', completed: false },
      { text: 'Journal', completed: false },
      { text: 'Mobility', completed: false },
      { text: 'Go to Sleep', completed: false },
    ],
    category: 'night',
  },
];

export const protocols: Routine[] = [
  {
    id: 'p-emergency',
    title: 'Emergency Protocol',
    steps: [{ text: 'This is your emergency protocol. Edit it to make it your own.', completed: false }],
    category: 'emergency',
  },
  {
    id: 'p-boredom',
    title: 'Boredom Protocol',
    steps: [{ text: 'This is your boredom protocol. Edit it to make it your own.', completed: false }],
    category: 'boredom',
  },
  {
    id: 'p-rerouting',
    title: 'Re-routing Protocol',
    steps: [{ text: 'This is your re-routing protocol. Edit it to make it your own.', completed: false }],
    category: 'rerouting',
  },
];

export const activityOptions = {
    meditation: [
        { value: 'breath_focus', label: 'Breath Focus' },
        { value: 'body_scan', label: 'Body Scan' },
        { value: 'loving_kindness', label: 'Loving-Kindness' },
    ],
    movement: [
        { value: 'upper_body', label: 'Upper Body' },
        { value: 'lower_body', label: 'Lower Body' },
        { value: 'run', label: 'Run' },
    ],
    onlineLearning: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'agentic_ai', label: 'Agentic AI' },
        { value: 'marketing', label: 'Marketing' },
    ],
    mobility: [
        { value: 'neck', label: 'Neck' },
        { value: 'back', label: 'Back' },
        { value: 'ankle', label: 'Ankle' },
    ]
}
