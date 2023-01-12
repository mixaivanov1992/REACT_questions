import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import '../assets/css/Home.css';

interface Props {
    sections: Array<string>
}

const Home: React.FC<Props> = (props: Props) => {
    const {sections} = props;
    return (
        <div className="sections">
            {
                sections.map(section=>(
                    <div key={uuid()} ><Link to={section}>{section}</Link></div>
                ))
            }
        </div>
    );
}

export default Home;
