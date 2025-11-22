export type Routine = {
  id: string;
  title: string;
  steps: string[];
};

export const dailyWorkflows: Routine[] = [
  {
    id: 'dwf-1',
    title: 'Morning Lab Prep',
    steps: [
      'Disinfect all surfaces',
      'Calibrate measurement tools',
      'Prepare chemical solutions',
      'Review daily experiment schedule',
    ],
  },
  {
    id: 'dwf-2',
    title: 'End of Day Shutdown',
    steps: [
      'Safely store all samples',
      'Clean glassware',
      'Shut down non-essential equipment',
      'Log daily progress and findings',
    ],
  },
];

export const emergencyInterventions: Routine[] = [
  {
    id: 'e-1',
    title: 'Chemical Spill',
    steps: [
      'Alert everyone in the immediate area',
      'Contain the spill with absorbent material',
      'Refer to MSDS for specific cleanup instructions',
      'Ventilate the area if safe to do so',
      'Contact safety officer',
    ],
  },
  {
    id: 'e-2',
    title: 'Power Outage',
    steps: [
      'Ensure all critical experiments are safely paused or terminated',
      'Switch to backup power for essential equipment (e.g., freezers)',
      'Unplug sensitive electronics',
      'Await instructions from facility manager',
    ],
  },
];
