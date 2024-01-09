import React, { useState, useEffect } from 'react';

interface TaskTrackerProps {
  totalTasks: number;
}

const TaskTracker: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const calculateFillPercentage = () => {
      const maxTasks = 20;
      const calculatedPercentage = (totalTasks / maxTasks) * 100;
      const cappedPercentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
      setFillPercentage(cappedPercentage);
    };

    calculateFillPercentage();
  }, [totalTasks]);

  return (
    <div className="task-tracker fixed top-0">
      <div className="header text-lg z-20">{totalTasks}</div>
      <div className="filling" style={{ height: `${fillPercentage}%` }}></div>
    </div>
  );
};

export default TaskTracker;
