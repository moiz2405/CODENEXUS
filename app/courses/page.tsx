import React from 'react';
import PathCarouselWithCourses from '../../components/courses/PathCarouselWithCourses';

const Page = () => {
    const paths = ['Full Stack', 'DevOps', 'Web Development','Front End','Back End', 'DSA','Cyber Security', 'Cloud Computing', 'AI/ML']; // Example paths

    return (
        <div>
            <PathCarouselWithCourses paths={paths} />
        </div>
    );
};

export default Page;
