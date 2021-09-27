// gql-frontend/src/contexts/Issue.tsx

import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

export type Issue = {
  number: number;
  title: string;
  url: string;
  state: string;
};

interface IssueContext {
  issues: Issue[];
  url: string;
}

interface Props {
  url: string;
}

export const IssueContext = createContext<IssueContext>({
  issues: [],
  url: '',
});

const IssueProvider: React.FC<Props> = ({ children, url }) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  //   TODO this is not the best practice

  // but i like use callback
  const fetchIssues = useCallback(async () => {
    const response = await axios(url);
    // console.log(response);

    // ofc there will always be a response
    if (response) setIssues(response.data);
  }, [url]);

  console.log({ issues });

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <IssueContext.Provider value={{ issues, url }}>
      {children}
    </IssueContext.Provider>
  );
};

export default IssueProvider;
