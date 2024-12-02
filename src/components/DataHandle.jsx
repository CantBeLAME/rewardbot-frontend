
import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { AssignmentStatus } from '../const/assignments';

export default function DataHandle({ data }) {
    const [dataset, setDataSet] = useState([]);

    useEffect(() => {
        function init(assignments) {
            const courseCounts = {};

            // Count assignments for each course
            assignments.forEach(assignment => {
                // const courseId = assignment.course_id;
                const course = assignment.context_name;

                if (courseCounts[course]) {
                    courseCounts[course]++;
                } else {
                    courseCounts[course] = 1;
                }
            });

            // Convert courseCounts object to an array
            return Object.entries(courseCounts).map(([course, count]) => ({
                label: course,
                value: count
            }));
        }


        function stack(assignments) {
            const courseCounts = {};

            // Count assignments for each course
            assignments.forEach(assignment => {
                // const courseId = assignment.course_id;
                const course = assignment.context_name;

                if (!courseCounts[course]) {
                    courseCounts[course] = { complete: 0, late: 0, missing: 0, nosubmission: 0 };
                }
                switch (assignment.submition_status) {
                    case AssignmentStatus.COMPLETE:
                        courseCounts[course].complete++;
                        break;
                    case AssignmentStatus.LATE:
                        courseCounts[course].late++;
                        break;
                    case AssignmentStatus.MISSING:
                        courseCounts[course].missing++;
                        break;
                    case AssignmentStatus.NOSUBMISSION:
                        courseCounts[course].nosubmission++;
                        break;
                    default:
                        break;
                }
            });

            
            // Convert courseCounts object to an array
            return Object.entries(courseCounts).map(([course, count]) => ({
                label: course,
                value: count
            }));

        }

    //     console.log(stack(data));
        setDataSet(stack(data));
    }, [data]);


    // const dataset = 

    // console.log(dataset);
    return (
        <div className='flex w-full h-full p-16'>
            <BarChart data={dataset} title='' value='# of assignment' label='courses' />
        </div>
    );

}
