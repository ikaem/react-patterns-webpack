import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IssueContext } from '../contexts/Issue';

const Issues = () => {
  const { issues, url } = useContext(IssueContext);
  console.log('hello', { issues });
  return (
    <div className='issues'>
      <h1>Issues</h1>

      {issues.map((issue) => {
        return (
          <p key={issue.title}>
            {/* <strong>#{issue.number}</strong> */}
            <a href={`${url}/${issue.number}`}>{issue.title}</a>
            {issue.state}
          </p>
        );
      })}
    </div>
  );
};

export default Issues;
